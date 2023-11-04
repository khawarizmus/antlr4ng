/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { ErrorNode } from "./ErrorNode.js";
import { ParseTreeVisitor } from "./ParseTreeVisitor.js";
import { TerminalNodeImpl } from "./TerminalNodeImpl.js";

/**
 * Represents a token that was consumed during resynchronization
 * rather than during a valid match operation. For example,
 * we will create this kind of a node during single token insertion
 * and deletion as well as during "consume until error recovery set"
 * upon no viable alternative exceptions.
 */
export class ErrorNodeImpl extends TerminalNodeImpl implements ErrorNode {
    public override accept<T>(visitor: ParseTreeVisitor<T>): T {
        return visitor.visitErrorNode(this);
    }
}
