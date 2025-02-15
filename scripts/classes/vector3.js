export const Vector3utils = {
	vector3Zero: {x:0,y:0,z:0},
	isValidVector3(vector){
		if(isNaN(vector.x) || isNaN(vector.y) || isNaN(vector.z)) return false;
		else return true;
	},
	substract(a,b){
		if(!this.isValidVector3(a) || !this.isValidVector3(b)) throw TypeError("Arguments 'a' and/or 'b' provided weren't valid vector3");
		return{
			x: a.x - b.x,
			y: a.y - b.y,
			z: a.z - b.z
		}
	},
	magnitude(xyz){
		if(!this.isValidVector3(xyz)) throw TypeError("Argument xyz provided wasn't a valid vector3");
		const {x,y,z} = xyz;
		return Math.sqrt(x**2 + y**2 + z**2);
	},
	distanceTo(from,to){
		if(!this.isValidVector3(from) || !this.isValidVector3(to)) throw TypeError("Arguments 'from' and/or 'to' provided weren't valid vector3");
		const newVector = this.substract(from, to);
		const distance = this.magnitude(newVector);
		return distance;
	},
	normalize(xyz){
		if(!this.isValidVector3(xyz)) throw TypeError("Argument xyz provided wasn't a valid vector3");
		const {x,y,z} = xyz;
		const magnitude = Math.sqrt(x * x + y * y + z * z);
		if (magnitude === 0) return { x: 0, y: 0, z: 0 };
		return {
		  x: x / magnitude,
		  y: y / magnitude,
		  z: z / magnitude
		};
	}
}