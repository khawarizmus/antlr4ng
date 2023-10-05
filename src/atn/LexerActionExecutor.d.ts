/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { CharStream } from "../CharStream.js";
import { Lexer } from "../Lexer.js";
import { LexerAction } from "./LexerAction.js";

export class LexerActionExecutor {
    public constructor(lexerActions: LexerAction[]);

    public static append(lexerActionExecutor: LexerActionExecutor,
        lexerAction: LexerActionExecutor): LexerActionExecutor;

    public fixOffsetBeforeMatch(offset: number): LexerActionExecutor;

    public execute(lexer: Lexer, input: CharStream, startIndex: number): void;

    public hashCode(): number;

    public updateHashCode(hash: number): void;

    public equals(other: unknown): boolean;
}
