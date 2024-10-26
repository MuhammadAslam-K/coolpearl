/* eslint-disable react/prop-types */
import { memo } from 'react';

function Table({ columns, data }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
                <thead className="bg-[#dce2f0] h-20">
                    <tr>
                        {columns?.map((column, index) => (
                            <th key={index} className="p-4 text-xs font-medium tracking-wider text-left text-black uppercase">
                                {column.Header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data?.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns?.map((column, colIndex) => (
                                <td key={colIndex} className="p-4 whitespace-nowrap">
                                    {column.Cell ? column.Cell({ value: row[column.accessor], row }) : (typeof column.accessor === 'function' ? column.accessor(row, rowIndex) : row[column.accessor])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default memo(Table);
