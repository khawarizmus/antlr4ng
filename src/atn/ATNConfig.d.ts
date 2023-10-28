/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { HashCode } from "../misc/HashCode.ts";
import { ATNState } from "./ATNState.js";

export declare class ATNConfig {
    public state: ATNState;

    public updateHashCode(hash: HashCode): void;
}
