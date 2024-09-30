import React, { useState, useEffect } from 'react';

const VennDiagram = ({ sets }) => {
  const colors = ['rgba(255, 0, 0, 0.3)', 'rgba(0, 255, 0, 0.3)', 'rgba(0, 0, 255, 0.3)'];

  const setPositions = sets.length === 2
    ? [{ cx: 180, cy: 150 }, { cx: 320, cy: 150 }]
    : [{ cx: 200, cy: 150 }, { cx: 300, cy: 150 }, { cx: 250, cy: 260 }];

  const calculateIntersection = (...sets) => {
    return sets.reduce((a, b) => a.filter(item => b.includes(item)));
  };

  const calculateExclusive = (set, otherSets) => {
    return set.filter(item => !otherSets.some(otherSet => otherSet.includes(item)));
  };



  const renderSetText = (set, index, x, y) => {
    const exclusive = calculateExclusive(set, sets.filter((_, i) => i !== index));
    return (
      <text key={index} x={x} y={y} textAnchor="middle" fill="black" fontSize="10">
        {exclusive.join(', ')}
      </text>
    );
  };

  const renderIntersectionText = () => {
    if (sets.length === 2) {
      const intersection = calculateIntersection(sets[0], sets[1]);
      return (
        <text x="250" y="150" textAnchor="middle" fill="black" fontSize="10">
          {intersection.join(', ')}
        </text>
      );
    } else if (sets.length === 3) {
      const intersectionAB = calculateIntersection(sets[0], sets[1]);
      const intersectionBC = calculateIntersection(sets[1], sets[2]);
      const intersectionAC = calculateIntersection(sets[0], sets[2]);
      const intersectionABC = calculateIntersection(sets[0], sets[1], sets[2]);

      return (
        <>
          <text x="250" y="130" textAnchor="middle" fill="black" fontSize="10">
            {intersectionAB.filter(item => !intersectionABC.includes(item)).join(', ')}
          </text>
          <text x="275" y="200" textAnchor="middle" fill="black" fontSize="10">
            {intersectionBC.filter(item => !intersectionABC.includes(item)).join(', ')}
          </text>
          <text x="225" y="200" textAnchor="middle" fill="black" fontSize="10">
            {intersectionAC.filter(item => !intersectionABC.includes(item)).join(', ')}
          </text>
          <text x="250" y="180" textAnchor="middle" fill="black" fontSize="10" fontWeight="bold">
            {intersectionABC.join(', ')}
          </text>
        </>
      );
    }
  };

  return (
   <svg width="100%" height="auto" viewBox="0 0 500 350" className="mx-auto mb-3" preserveAspectRatio="xMidYMid meet" >
      {sets.map((set, index) => (
        <circle
          key={index}
          cx={setPositions[index].cx}
          cy={setPositions[index].cy}
          r={100}
          fill={colors[index]}
          stroke="black"
        />
      ))}
      {sets.map((set, index) => renderSetText(
        set,
        index,
        setPositions[index].cx + (index === 2 ? 0 : (index === 0 ? -40 : 40)),
        setPositions[index].cy + (index === 2 ? 40 : -40)
      ))}
      {renderIntersectionText()}
      {sets.map((set, index) => (
        <text
          key={index}
          x={setPositions[index].cx}
          y={setPositions[index].cy + (index === 2 ? 80 : -80)}
          textAnchor="middle"
          fill="black"
          fontSize="14"
          fontWeight="bold"
        >
          {`${String.fromCharCode(65 + index)}`}
        </text>
      ))}
    </svg>
  );
};

const SetOperations = ({ sets }) => {
  const calculateUnion = (...sets) => [...new Set(sets.flat())];
  const calculateIntersection = (...sets) => sets.reduce((a, b) => a.filter(c => b.includes(c)));
  const calculateDifference = (setA, setB) => setA.filter(x => !setB.includes(x));

  function calculateExclusiveIntersection(set1, set2, generalIntersection) {
    const intersection = set1.filter((element) => set2.includes(element));
    return intersection.filter((element) => !generalIntersection.includes(element));
  }


  const calculateSymmetricDifference = (setA, setB) => [
    ...setA.filter(x => !setB.includes(x)),
    ...setB.filter(x => !setA.includes(x))
  ];

  const operations = [
    { name: 'Unión', result: calculateUnion(...sets) },
    { name: 'Intersección', result: calculateIntersection(...sets) },
  ];

  if (sets.length === 3) {
    operations.push({ name: 'Complemento A̅', result: calculateDifference(calculateUnion(sets[1], sets[2]), sets[0]) });
    operations.push({ name: 'Complemento B̅', result: calculateDifference(calculateUnion(sets[0], sets[2]), sets[1]) });
    operations.push({ name: 'Complemento C̅', result: calculateDifference(calculateUnion(sets[0], sets[1]), sets[2]) });

    const generalIntersection = calculateIntersection(calculateIntersection(sets[0], sets[1]), sets[2]);

    operations.push({
      name: 'Intersección (A ∩ B)',
      result: calculateExclusiveIntersection(sets[0], sets[1], generalIntersection)
    });

    operations.push({
      name: 'Intersección (A ∩ C)',
      result: calculateExclusiveIntersection(sets[0], sets[2], generalIntersection)
    });

    operations.push({
      name: 'Intersección (B ∩ C)',
      result: calculateExclusiveIntersection(sets[1], sets[2], generalIntersection)
    });


  }

  if (sets.length === 2) {
    operations.push({ name: 'Diferencia (A-B)', result: calculateDifference(sets[0], sets[1]) });
    operations.push({ name: 'Diferencia (B-A)', result: calculateDifference(sets[1], sets[0]) });
    operations.push({ name: 'Diferencia Simétrica', result: calculateSymmetricDifference(sets[0], sets[1]) });
  
    // No acceder a sets[2] porque solo hay 2 conjuntos
    operations.push({ name: 'Complemento A̅', result: calculateDifference(calculateUnion(sets[1]), sets[0]) });
    operations.push({ name: 'Complemento B̅', result: calculateDifference(calculateUnion(sets[0]), sets[1]) });
  }
  


  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Operaciones de Conjuntos</h3>
      {operations.map((op, index) => (
        <div key={index} className="mb-2">
          <span className="font-semibold">{op.name}:</span> {op.result.join(', ')}
        </div>
      ))}
    </div>
  );
};

export const VennChartApp = () => {
  const [numSets, setNumSets] = useState(2);
  const [setValues, setSetValues] = useState({ set1: '', set2: '', set3: '' });

  const handleSetChange = (e) => {
    const { name, value } = e.target;
    setSetValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const sets = Object.values(setValues)
    .slice(0, numSets)
    .map(value => value.split(',').map(item => item.trim()).filter(Boolean));

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Diagrama de Venn Interactivo</h2>

      <div className="mb-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <label className="font-semibold text-lg text-gray-700">Número de conjuntos:</label>
        <select
          value={numSets}
          onChange={(e) => setNumSets(parseInt(e.target.value))}
          className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-indigo-400 transition duration-200 ease-in-out"
        >
          <option value={2}>2 Conjuntos</option>
          <option value={3}>3 Conjuntos</option>
        </select>
      </div>


      <form className="mb-8">
        {[1, 2, 3].slice(0, numSets).map((setNum) => (
          <div key={setNum} className="mb-4">
            <label className="block mb-2 font-semibold">Conjunto {setNum}:</label>
            <input
              type="text"
              name={`set${setNum}`}
              value={setValues[`set${setNum}`]}
              onChange={handleSetChange}
              placeholder="Ingrese valores separados por comas"
              className="p-2 border rounded w-full"
            />
          </div>
        ))}
      </form>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <VennDiagram sets={sets} />
        <SetOperations sets={sets} />
      </div>
    </div>
  );
};
