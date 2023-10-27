/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { Parser } from "../Parser.js";
import { Recognizer } from "../Recognizer.js";
import { HashCode, IHashUpdatable } from "../misc/HashCode.ts";
import { ATNSimulator } from "./ATNSimulator.ts";
import { RuleContext } from "./RuleContext.js";

export declare class SemanticContext implements IHashUpdatable {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static readonly NONE: SemanticContext;

    public static andContext(a: SemanticContext, b: SemanticContext): SemanticContext;
    public static orContext(a: SemanticContext, b: SemanticContext): SemanticContext;

    public equals(other: unknown): boolean;
    public hashCode(): number;
    public updateHashCode(hash: HashCode): void;
    public evaluate(parser: Parser, outerContext: RuleContext): boolean;
    public evalPrecedence(parser: Recognizer<ATNSimulator>, parserCallStack: RuleContext | null): SemanticContext;

}
