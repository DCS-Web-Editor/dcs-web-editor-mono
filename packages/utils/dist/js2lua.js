import { isArray, isEmpty, isObject, isString, forOwn, range } from "lodash";
export const js2Lua = (data, depth = 0) => {
    const indentation = range(0, depth + 1)
        .map(() => "")
        .join("\t");
    if (isArray(data)) {
        if (isEmpty(data)) {
            return `\n${indentation}{\n${indentation}}`;
        }
        return `\n${indentation}{\n${data
            .map((it, idx) => `${indentation}\t[${idx + 1}]=${js2Lua(it, depth + 1)}`)
            .join(",\n")}\n${indentation}}`;
    }
    if (isObject(data)) {
        if (isEmpty(data)) {
            return `\n${indentation}{\n${indentation}}`;
        }
        let str = [];
        // Don't use loadsh map as some objects can have "length: 0"
        forOwn(data, (value, key) => str.push(`${indentation}\t[${js2Lua(key)}]=${js2Lua(value, depth + 1)}`));
        return `\n${indentation}{\n${str.join(",\n")}\n${indentation}}`;
    }
    if (typeof data === 'number') {
        return data.toString();
    }
    // dont parse 0x colors. We need to check both Number() and parseInt() because Number(undefined) === 0
    if (typeof data === 'string' && !Number.isNaN(Number(data)) && !Number.isNaN(parseInt(data)) && !data.startsWith('0x')) {
        return Number(data).toString();
    }
    if (isString(data)) {
        return JSON.stringify(data);
    }
    return `${data}`;
};
