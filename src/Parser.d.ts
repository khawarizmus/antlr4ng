/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { Recognizer } from "./Recognizer.js";
import { Token } from "./Token.js";
import { TokenFactory } from "./TokenFactory.js";
import { TokenStream } from "./TokenStream.js";
import { ParserATNSimulator } from "./atn/ParserATNSimulator.js";
import { ParserRuleContext } from "./ParserRuleContext.js";
import { ANTLRErrorStrategy } from "./ANTLRErrorStrategy.js";
import { RecognitionException } from "./RecognitionException.js";
import { IntervalSet } from "./misc/IntervalSet.js";
import { ParseTreeListener } from "./tree/ParseTreeListener.js";
import { TerminalNode } from "./tree/TerminalNode.js";
import { ErrorNode } from "./tree/ErrorNode.js";
import { RuleContext } from "./atn/RuleContext.ts";

export declare abstract class Parser extends Recognizer<ParserATNSimulator> {
    public errorHandler: ANTLRErrorStrategy;
    public matchedEOF: boolean;
    public buildParseTrees: boolean;

    protected _ctx: ParserRuleContext;
    protected _parseListeners: ParseTreeListener[] | null;

    public constructor(input: TokenStream);

    public get context(): ParserRuleContext;

    public reset(): void;
    public match(ttype: number): Token;
    public matchWildcard(): Token;
    public getParseListeners(): ParseTreeListener[];
    public addParseListener(listener: ParseTreeListener): void;
    public removeParseListener(listener: ParseTreeListener): void;
    public removeParseListeners(): void;
    public triggerEnterRuleEvent(): void;
    public triggerExitRuleEvent(): void;

    public getTokenFactory(): TokenFactory<Token>;
    public setTokenFactory(factory: TokenFactory<Token>): void;

    public getATNWithBypassAlts(): string;

    public get tokenStream(): TokenStream;
    public set tokenStream(input: TokenStream);

    public override get inputStream(): TokenStream;
    public override set inputStream(input: TokenStream);

    public get numberOfSyntaxErrors(): number;

    public getCurrentToken(): Token;
    public notifyErrorListeners(msg: string, offendingToken: Token | null, err: RecognitionException | null): void;
    public consume(): Token;
    public addContextToParseTree(): void;
    public enterRule(localctx: ParserRuleContext, state: number, ruleIndex: number): void;
    public exitRule(): void;
    public enterOuterAlt(localctx: ParserRuleContext, altNum: number): void;
    public getPrecedence(): number;
    public enterRecursionRule(localctx: ParserRuleContext, state: number, ruleIndex: number, precedence: number): void;
    public pushNewRecursionContext(localctx: ParserRuleContext, state: number, ruleIndex: number): void;
    public unrollRecursionContexts(parent: ParserRuleContext): void;
    public getInvokingContext(ruleIndex: number): ParserRuleContext;

    public precpred(localctx: RuleContext | null, precedence: number): boolean;

    public isExpectedToken(symbol: number): boolean;
    public getExpectedTokens(): IntervalSet;
    public getExpectedTokensWithinCurrentRule(): IntervalSet;
    public getRuleIndex(ruleName: string): number;
    public getRuleInvocationStack(): string[];
    public getDFAStrings(): string[];
    public dumpDFA(): void;
    public getSourceName(): string;
    public setTrace(trace: boolean): void;

    public createTerminalNode(parent: ParserRuleContext, token: Token,): TerminalNode;
    public createErrorNode(parent: ParserRuleContext, token: Token,): ErrorNode;
}
