function testDiv() {  
	expect(1);  
	equals(4/2, 2, 'Expected 2 as the result, result was: ' + 4/2);  
}

function testSum() {  
	expect(3);  
	equals(4+3, 7, 'Expected 7 as the result, result was: ' + 4+3);  
	equals(11+20, 31, 'Expected 31 as the result, result was: ' + 11+20);  
	equals(99+99, 198, 'Expected 198 as the result, result was: ' + 99+99);  
}



function getVal() {
	return 0;
}

function divide(a,b)  
{  
  return a / b;  
} 

function testReturn() {
	expect(2);
	equals(getVal(), 0, 'Expected 0 as the result, result was: ' + getVal());
	equals(divide(8,2), 4, 'Expected 4 as the result, result was: ' + divide(8,2));
}


function testAssertions() {
	expect(8);
	ok(true, 'Equivalent to JUnit\'s assertTrue');
	equal(1, "1", 'Equivalent to assertEquals');
	notEqual(1, 2, 'Equivalent to assertNotEquals');
	deepEqual(new Array(1, 2, 3), new Array(1, 2, 3), 'Recursive check');
	notDeepEqual(new Array(1, 2, 3), new Array(1, 2, 4), 'Recursive check');
	strictEqual( 1, 1, 'Type checking equality');
	notStrictEqual(1, "1", 'Type checking inequality');
	raises(function() { throw new Error("failing test"); }, Error, "Function must throw an Error to pass");
}
