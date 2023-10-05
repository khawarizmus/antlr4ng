/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

export declare class HashCode {
    public constructor();

    public static hashStuff(v: unknown): number;

    public update(v: unknown): void;
    public finish(): number;

}
