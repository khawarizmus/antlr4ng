/*
 * Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import ATNState from "./ATNState.js";
import RuleStopState from "./RuleStopState.js";

export declare class RuleStartState extends ATNState {
    public stopState: RuleStopState;
    public isLeftRecursiveRule: boolean;
    public isPrecedenceRule: boolean;
}

export default RuleStartState;
