/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { Lexer } from "../Lexer.js";
import { LexerAction } from "./LexerAction.js";

export declare class LexerIndexedCustomAction extends LexerAction {
    public constructor(offset: number, action: number);

    public execute(lexer: Lexer): void;

    public updateHashCode(hash: number): number;

    public equals(other: unknown): boolean;
}
