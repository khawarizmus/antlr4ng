/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { ParseTree } from "./ParseTree.js";
import { RuleContext } from "../RuleContext.js";

export interface RuleNode extends ParseTree {
    getRuleContext: () => RuleContext | null;
}

export const isRuleNode = (candidate: unknown): candidate is RuleNode => {
    return typeof (candidate as RuleNode).getRuleContext === "function";
};
