// ---------------------------------------
// --- Manages lazy loading components ---
// ---------------------------------------

export function prepare(filePath, accessor = "default") {
    const isAbsPath = filePath.startsWith("@/");

    if (!isAbsPath) {
        throw `Error: module path '${filePath}' must be an absolute path`
    }

    const loadFunc = async () => {
        const component = await import(`@/${filePath.substring(2)}`);

        return component[accessor];
    };

    return {
        load: loadFunc
    };
}