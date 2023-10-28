/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { ATNState } from "./atn/ATNState.js";
import { BitSet } from "./misc/BitSet.js";
import { FailedPredicateException } from "./FailedPredicateException.js";
import { InputMismatchException } from "./InputMismatchException.js";
import { InterpreterRuleContext } from "./InterpreterRuleContext.js";
import { LoopEndState } from "./atn/LoopEndState.js";
import { Parser } from "./Parser.js";
import { ParserATNSimulator } from "./atn/ParserATNSimulator.js";
import { RecognitionException } from "./RecognitionException.js";
import { StarLoopEntryState } from "./atn/StarLoopEntryState.js";
import { Token } from "./Token.js";
import { ATNStateType } from "./atn/ATNStateType.js";
import { TransitionType } from "./atn/TransitionType.js";
import { DFA } from "./dfa/DFA.js";
import { PredictionContextCache } from "./atn/PredictionContextCache.js";

export class ParserInterpreter extends Parser {
    #grammarFileName;
    #atn;
    #ruleNames;
    #vocabulary;
    #decisionToDFA;
    #sharedContextCache = new PredictionContextCache();

    #pushRecursionContextStates;

    _rootContext;

    _parentContextStack = [];

    overrideDecision = -1;
    overrideDecisionInputIndex = -1;
    overrideDecisionAlt = -1;
    overrideDecisionReached = false;

    _overrideDecisionRoot = undefined;

    constructor(grammarFileName, vocabulary, ruleNames, atn, input) {
        super(input);
        this.#grammarFileName = grammarFileName;
        this.#atn = atn;
        this.#ruleNames = ruleNames.slice(0);
        this.#vocabulary = vocabulary;

        // Cache the ATN states where pushNewRecursionContext() must be called in `visitState()`.
        this.#pushRecursionContextStates = new BitSet();
        for (let state of atn.states) {
            if (state instanceof StarLoopEntryState && state.precedenceRuleDecision) {
                this.#pushRecursionContextStates.set(state.stateNumber);
            }
        }

        this.#decisionToDFA = atn.decisionToState.map(function (ds, i) {
            return new DFA(ds, i);
        });

        // get atn simulator that knows how to do predictions
        this.interpreter = new ParserATNSimulator(this, atn, this.#decisionToDFA, this.#sharedContextCache);
    }

    reset(resetInput) {
        super.reset(resetInput);

        this.overrideDecisionReached = false;
        this._overrideDecisionRoot = undefined;
    }

    get atn() {
        return this.#atn;
    }

    get vocabulary() {
        return this.#vocabulary;
    }

    get ruleNames() {
        return this.#ruleNames;
    }

    get grammarFileName() {
        return this.#grammarFileName;
    }

    get atnState() {
        return this.#atn.states[this.state];
    }

    parse(startRuleIndex) {
        let startRuleStartState = this.#atn.ruleToStartState[startRuleIndex];

        this._rootContext = this.createInterpreterRuleContext(undefined, ATNState.INVALID_STATE_NUMBER, startRuleIndex);
        if (startRuleStartState.isPrecedenceRule) {
            this.enterRecursionRule(this._rootContext, startRuleStartState.stateNumber, startRuleIndex, 0);
        }
        else {
            this.enterRule(this._rootContext, startRuleStartState.stateNumber, startRuleIndex);
        }

        while (true) {
            let p = this.atnState;
            switch (p.stateType) {
                case ATNStateType.RULE_STOP:
                    // pop; return from rule
                    if (this._ctx.isEmpty) {
                        if (startRuleStartState.isPrecedenceRule) {
                            let result = this._ctx;
                            let parentContext = this._parentContextStack.pop();
                            this.unrollRecursionContexts(parentContext[0]);
                            return result;
                        }
                        else {
                            this.exitRule();
                            return this._rootContext;
                        }
                    }

                    this.visitRuleStopState(p);
                    break;

                default:
                    try {
                        this.visitState(p);
                    }
                    catch (e) {
                        if (e instanceof RecognitionException) {
                            this.state = this.#atn.ruleToStopState[p.ruleIndex].stateNumber;
                            this.context.exception = e;
                            this.errorHandler.reportError(this, e);
                            this.recover(e);
                        } else {
                            throw e;
                        }
                    }

                    break;
            }
        }
    }

    enterRecursionRule(localctx, state, ruleIndex, precedence) {
        this._parentContextStack.push([this._ctx, localctx.invokingState]);
        super.enterRecursionRule(localctx, state, ruleIndex, precedence);
    }

    visitState(p) {
        let predictedAlt = 1;
        if (p.transitions.length > 1) {
            predictedAlt = this.visitDecisionState(p);
        }

        let transition = p.transitions[predictedAlt - 1];
        switch (transition.getSerializationType()) {
            case TransitionType.EPSILON:
                if (this.#pushRecursionContextStates.get(p.stateNumber) &&
                    !(transition.target instanceof LoopEndState)) {
                    // We are at the start of a left recursive rule's (...)* loop
                    // and we're not taking the exit branch of loop.
                    let parentContext = this._parentContextStack[this._parentContextStack.length - 1];
                    let localctx =
                        this.createInterpreterRuleContext(parentContext[0], parentContext[1], this._ctx.ruleIndex);
                    this.pushNewRecursionContext(localctx,
                        this.#atn.ruleToStartState[p.ruleIndex].stateNumber,
                        this._ctx.ruleIndex);
                }
                break;

            case TransitionType.ATOM:
                this.match(transition.label.minElement);
                break;

            case TransitionType.RANGE:
            case TransitionType.SET:
            case TransitionType.NOT_SET:
                if (!transition.matches(this._input.LA(1), Token.MIN_USER_TOKEN_TYPE, 65535)) {
                    this.recoverInline();
                }
                this.matchWildcard();
                break;

            case TransitionType.WILDCARD:
                this.matchWildcard();
                break;

            case TransitionType.RULE:
                let ruleStartState = transition.target;
                let ruleIndex = ruleStartState.ruleIndex;
                let newContext = this.createInterpreterRuleContext(this._ctx, p.stateNumber, ruleIndex);
                if (ruleStartState.isPrecedenceRule) {
                    this.enterRecursionRule(newContext, ruleStartState.stateNumber, ruleIndex, (transition).precedence);
                }
                else {
                    this.enterRule(newContext, transition.target.stateNumber, ruleIndex);
                }
                break;

            case TransitionType.PREDICATE:
                let predicateTransition = transition;
                if (!this.sempred(this._ctx, predicateTransition.ruleIndex, predicateTransition.predIndex)) {
                    throw new FailedPredicateException(this);
                }

                break;

            case TransitionType.ACTION:
                let actionTransition = transition;
                this.action(this._ctx, actionTransition.ruleIndex, actionTransition.actionIndex);
                break;

            case TransitionType.PRECEDENCE:
                if (!this.precpred(this._ctx, transition.precedence)) {
                    let precedence = transition.precedence;
                    throw new FailedPredicateException(this, `precpred(_ctx, ${precedence})`);
                }
                break;

            default:
                throw new Error("UnsupportedOperationException: Unrecognized ATN transition type.");
        }

        this.state = transition.target.stateNumber;
    }

    visitDecisionState(p) {
        let predictedAlt = 1;

        if (p.transitions.length > 1) {
            this.errorHandler.sync(this);
            let decision = p.decision;
            if (decision === this.overrideDecision && this._input.index === this.overrideDecisionInputIndex &&
                !this.overrideDecisionReached) {
                predictedAlt = this.overrideDecisionAlt;
                this.overrideDecisionReached = true;
            } else {
                predictedAlt = this.interpreter.adaptivePredict(this._input, decision, this._ctx);
            }
        }

        return predictedAlt;
    }

    createInterpreterRuleContext(parent, invokingStateNumber, ruleIndex) {
        return new InterpreterRuleContext(ruleIndex, parent, invokingStateNumber);
    }

    visitRuleStopState(p) {
        let ruleStartState = this.#atn.ruleToStartState[p.ruleIndex];
        if (ruleStartState.isPrecedenceRule) {
            let parentContext = this._parentContextStack.pop();
            this.unrollRecursionContexts(parentContext[0]);
            this.state = parentContext[1];
        } else {
            this.exitRule();
        }

        let ruleTransition = this.#atn.states[this.state].transitions[0];
        this.state = ruleTransition.followState.stateNumber;
    }

    addDecisionOverride(decision, tokenIndex, forcedAlt) {
        this.overrideDecision = decision;
        this.overrideDecisionInputIndex = tokenIndex;
        this.overrideDecisionAlt = forcedAlt;
    }

    get overrideDecisionRoot() {
        return this._overrideDecisionRoot;
    }

    recover(e) {
        let i = this._input.index;
        this.errorHandler.recover(this, e);
        if (this._input.index === i) {
            // no input consumed, better add an error node
            let tok = e.offendingToken;
            if (!tok) {
                throw new Error("Expected exception to have an offending token");
            }

            const source = tok.getTokenSource();
            const stream = source?.inputStream ?? null;
            const sourcePair = [source, stream];

            if (e instanceof InputMismatchException) {
                let expectedTokens = e.getExpectedTokens();
                if (!expectedTokens) {
                    throw new Error("Expected the exception to provide expected tokens");
                }

                let expectedTokenType = Token.INVALID_TYPE;
                if (!expectedTokens.isNil) {
                    // get any element
                    expectedTokenType = expectedTokens.minElement;
                }

                let errToken =
                    this.getTokenFactory().create(sourcePair,
                        expectedTokenType, tok.text,
                        Token.DEFAULT_CHANNEL,
                        -1, -1, // invalid start/stop
                        tok.line, tok.charPositionInLine);
                this._ctx.addErrorNode(this.createErrorNode(this._ctx, errToken));
            } else { // NoViableAlt
                let errToken =
                    this.getTokenFactory().create(sourcePair,
                        Token.INVALID_TYPE, tok.text,
                        Token.DEFAULT_CHANNEL,
                        -1, -1, // invalid start/stop
                        tok.line, tok.charPositionInLine);
                this._ctx.addErrorNode(this.createErrorNode(this._ctx, errToken));
            }
        }
    }

    recoverInline() {
        return this.errorHandler.recoverInline(this);
    }

    get rootContext() {
        return this._rootContext;
    }
}
