/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { PredictionContext } from "./PredictionContext.js";
import { SingletonPredictionContext } from "./SingletonPredictionContext.ts";

export class EmptyPredictionContext extends SingletonPredictionContext {

    public constructor();

    public isEmpty(): boolean;

    public getParent(_index: number): PredictionContext | null;

    public getReturnState(_index: number): number;

    public equals(other: unknown): boolean;

    public toString(): string;
}
