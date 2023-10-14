/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { HashCode } from "../misc/HashCode.ts";

export class PredictionContext {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static EMPTY_RETURN_STATE: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static EMPTY: PredictionContext;

    public constructor(cachedHashCode: number);

    public isEmpty(): boolean;

    public hasEmptyPath(): boolean;

    public hashCode(): number;

    public updateHashCode(hash: HashCode): void;
}
