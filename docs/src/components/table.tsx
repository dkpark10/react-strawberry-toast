import clsx from 'clsx';
import { Docs } from './docs-title';

interface TableProps {
  headers: Array<string>;
  body: Array<Array<string>>;
}

export function Table({ headers, body }: TableProps) {
  return (
    <>
      <table className="w-full max-w-[1100px]">
        <thead>
          <tr className="border-t border-primary-gray">
            {headers.map((header) => (
              <th className="py-2 font-normal" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, idx) => {
            return (
              <tr key={idx} className="border-y border-primary-gray">
                {row.map((item) => {
                  return (
                    <td key={item} className={`py-2 pl-2 font-normal ${clsx(idx % 2 && 'bg-[#ececec]')}`}>
                      {item}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Docs.SpaceSm />
    </>
  );
}
