/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { IntStream } from "./IntStream.js";
import { Token } from "./Token.js";
import { Vocabulary } from "./Vocabulary.js";
import { ATN } from "./atn/ATN.js";
import { ATNSimulator } from "./atn/ATNSimulator.js";
import { RuleContext } from "./RuleContext.js";
import { BaseErrorListener } from "./BaseErrorListener.js";
import { RecognitionException } from "./RecognitionException.js";
import { ProxyErrorListener } from "./ProxyErrorListener.js";

export declare abstract class Recognizer<ATNInterpreter extends ATNSimulator> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static readonly EOF: number;

    public interpreter: ATNInterpreter;

    public addErrorListener(listener: BaseErrorListener): void;
    public removeErrorListeners(): void;

    public getTokenTypeMap(): Map<Vocabulary, Map<string, number>>;
    public getRuleIndexMap(): Map<string[], Map<string, number>>;

    public getTokenType(tokenName: string): number;
    public getErrorHeader(e: RecognitionException): string;
    public getTokenErrorDisplay(t: Token | null): string;
    public getErrorListenerDispatch(): ProxyErrorListener;

    public sempred(_localctx: RuleContext | null, ruleIndex: number, actionIndex: number): boolean;
    public precpred(localctx: RuleContext | null, precedence: number): boolean;
    public action(_localctx: RuleContext | null, ruleIndex: number, actionIndex: number): void;

    public get atn(): ATN;

    public get state(): number;
    public set state(newState: number);

    protected checkVersion(toolVersion: string): void;

    public abstract get inputStream(): IntStream;
    public abstract set inputStream(input: IntStream);

    // TODO: remove need for this: public abstract get literalNames(): Array<string | null>;
    // TODO: remove need for this: public abstract get symbolicNames(): Array<string | null>;
    public abstract get grammarFileName(): string;
    public abstract get ruleNames(): string[];
    public abstract get vocabulary(): Vocabulary;
}
