class Vector2 {
	public x:number;
	public y:number;
	public constructor(x:number=0,y:number=0) {
		this.x = x;
		this.y = y;
	}
	/**
	 * Returns the length of this vector (Read Only).
	 * The length of the vector is square root of (x*x+y*y).
	 * If you only need to compare magnitudes of some vectors, you can compare squared magnitudes of them using sqrMagnitude (computing squared magnitudes is faster).
	 */
	public get magnitude():number{
		return MathUtil.magnitude(this.x,this.y);
	}
	/**
	 * Returns the squared length of this vector (Read Only).
	 * Calculating the squared magnitude instead of the magnitude is much faster. 
	 * Often if you are comparing magnitudes of two vectors you can just compare their squared magnitudes.
	 */
	public get sqrMagnitude():number{
		return this.x*this.x+this.y*this.y;
	}
	/**
	 * Returns the distance between a and b.
		Vector2.Distance(a,b) is the same as (a-b).magnitude.
	 */
	public static distance(a:Vector2,b:Vector2):number{
		return MathUtil.magnitude(b.x-a.x,b.y-a.y);
	}
}