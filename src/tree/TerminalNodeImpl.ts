/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { Interval } from "../misc/Interval.js";
import { Token } from "../Token.js";
import { ParseTree } from "./ParseTree.js";
import { ParseTreeVisitor } from "./ParseTreeVisitor.js";
import { TerminalNode } from "./TerminalNode.js";

export class TerminalNodeImpl implements TerminalNode {
    public parent: ParseTree | null = null;
    public symbol: Token | null = null;

    public constructor(symbol: Token | null) {
        this.symbol = symbol;
    }

    public getChild(_i: number): ParseTree | null {
        return null;
    }

    public getSymbol(): Token | null {
        return this.symbol;
    }

    public getPayload(): Token | null {
        return this.symbol;
    }

    public getSourceInterval(): Interval {
        if (this.symbol === null) {
            return Interval.INVALID_INTERVAL;
        }
        const tokenIndex = this.symbol.tokenIndex;

        return new Interval(tokenIndex, tokenIndex);
    }

    public getChildCount(): number {
        return 0;
    }

    public accept<T>(visitor: ParseTreeVisitor<T>): T | null {
        return visitor.visitTerminal(this);
    }

    public getText(): string {
        return this.symbol?.text ?? "";
    }

    public toString(): string {
        if (this.symbol?.type === Token.EOF) {
            return "<EOF>";
        } else {
            return this.symbol?.text ?? "";
        }
    }

    public toStringTree(): string {
        return this.toString();
    }
}
