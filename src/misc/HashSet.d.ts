/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

export declare class HashSet<T> {
    public constructor(hashFunction: unknown, equalsFunction: unknown);

    public add(value: T): T;

    public has(value: T): boolean;

    public get(value: T): T | null;

    public values(): T[];

    public toString(): string;

    public get length(): number;
}
