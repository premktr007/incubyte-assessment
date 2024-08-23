function calculator() {
    const operations = {
      add: (a, b) => a + b,
      subtract: (a, b) => a - b,
      multiply: (a, b) => a * b,
      divide: (a, b) => {
        if (b === 0) {
          throw new Error('Division by zero is not allowed');
        }
        return a / b;
      },
    };
  
    function parseInput(input) {
      const delimiterPattern = /^\/\/(.+)\n/;
      let delimiter = /[\D]+/;
  
      if (delimiterPattern.test(input)) {
        const match = input.match(delimiterPattern);
        delimiter = new RegExp(`[${match[1]}]`);
        input = input.replace(delimiterPattern, '');
      }
  
      // Split the string based on the delimiter and filter out empty values
      const numbers = input.split(delimiter).filter(Boolean);
  
      // Convert the values to numbers and check for negatives
      const negativeNumbers = [];
      const parsedNumbers = numbers.map((num) => {
        const n = parseInt(num, 10);
        if (n < 0) {
          negativeNumbers.push(n);
        }
        return n;
      });
  
      // If negative numbers are found, throw an exception
      if (negativeNumbers.length > 0) {
        throw new Error(
          `Negative numbers not allowed: ${negativeNumbers.join(', ')}`
        );
      }
  
      return parsedNumbers;
    }
  
    return {
      add: function (input) {
        const numbers = parseInput(input);
        return numbers.reduce(operations.add, 0);
      },
      subtract: function (input) {
        const numbers = parseInput(input);
        return numbers.reduce(operations.subtract);
      },
      multiply: function (input) {
        const numbers = parseInput(input);
        return numbers.reduce(operations.multiply, 1);
      },
      divide: function (input) {
        const numbers = parseInput(input);
        return numbers.reduce(operations.divide);
      },
    };
  }
  
  const calculate = calculator();
  try {
    console.log(calculate.add('//;\n11;21'));
    console.log(calculate.subtract('10,5,2'));
    console.log(calculate.multiply('2\n3\n4'));
    console.log(calculate.divide('20,2,5'));
  } catch (error) {
    console.error(error.message);
  }
  