/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { Token } from "../Token.js";
import { ParseTree } from "./ParseTree.js";

export interface TerminalNode extends ParseTree {
    getSymbol(): Token | null;
}
