// Type definitions for SIMD.js
// Project: https://github.com/anderflash/atkvjs
// Definitions by: Anderson Tavares <acmt@outlook.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace SIMD{
  interface Float32x4{
    (x?:number, y?:number, z?:number, w?:number): Float32x4;
    // Checking SIMD types
    check(value:any):Float32x4;
    // Accessing and mutating lanes
    extractLane(t:Float32x4, index:number): number;
    replaceLane(t:Floa): any;
    // Loading and storing into typed arrays
    load();
    load1();
    load2();
    load3();
    store();
    store1();
    store2();
    store3();
    // Arithmetic operations
    abs();
    add();
    div();
    mul();
    neg();
    reciprocalApproximation();
    reciprocalSqrtApproximation();
    sub();
    sqrt();
    // Shuffling and swizzling
    shiffle();
    swizzle();
    // Min and max values
    max();
    maxNum();
    min();
    minNum();
    // Selections
    select();
    // Comparisons
    equal();
    notEqual();
    lessThan();
    lessThanOrEqual();
    greaterThan();
    greaterThanOrEqual();
    // Data conversions
    fromFloat64x2Bits();
    fromInt32x4();
    fromInt32x4Bits();
    fromInt16x8Bits();
    fromInt8x16Bits();
    fromUint32x4();
    fromUint32x4Bits();
    fromUint16x8Bits();
    fromUint8x16Bits();
    // SIMD prototype
    toLocaleString();
    toString();
    valueOf();
    toSource();

  }
  var Float32x4: Float32x4;
}