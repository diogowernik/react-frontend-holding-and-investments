import React from 'react';
import { filterGroupMap } from '../../group_functions';

const EvolutionTable = ({ portfolio_evolution, activeYear, currency }) => {
    const filteredEvolution = portfolio_evolution.filter(item => item.date.includes(activeYear));
    const filteredCategoryEvolution = filterGroupMap(filteredEvolution, "date");

    filteredCategoryEvolution.forEach(category => {
        category.data.sort((a, b) => a.category > b.category ? 1 : -1);
    });

    const category_evolution_sum = filteredCategoryEvolution.map(name => {
        const category_total = name.data.reduce((acc, cur) => acc + cur[`category_total_${currency}`], 0);
        return { name: name.name, total: category_total };
    });

    const combinedData = filteredCategoryEvolution.reduce((acc, cur) => [...acc, ...cur.data], []);
    const categoryMap = combinedData.reduce((acc, cur) => {
        acc[cur.category] = acc[cur.category] || [];
        acc[cur.category].push(cur);
        return acc;
    }, {});

    return (
        <table className="table table-sm table-hover table-striped table-bordered table-responsive-sm">
            <thead>
                <tr>
                    <th scope="col">Categoria</th>
                    {filteredCategoryEvolution.map(({ name }) => (
                        <th scope="col" key={name}>{name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.entries(categoryMap).map(([category, values]) => (
                    <tr key={category}>
                        <th>{category}</th>
                        {values.map(({ id, ...category_total }) => (
                            <td key={id}>
                                {(category_total[`category_total_${currency}`].toLocaleString('pt-BR', { style: 'currency', currency: currency.toUpperCase() })).split(',')[0]}
                            </td>
                        ))}
                    </tr>
                ))}
                <tr key="total" className="text-primary font-weight-bold">
                    <th>Total</th>
                    {category_evolution_sum.map(({ total }) => (
                        <td key={total}>
                            {(total.toLocaleString('pt-BR', { style: 'currency', currency: currency.toUpperCase() })).split(',')[0]}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
};

export default EvolutionTable;

