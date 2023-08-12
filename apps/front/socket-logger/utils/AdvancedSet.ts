export default class AdvancedSet<V> extends Set<V> {
    public constructor(entries?: readonly V[] | null) {
        super(entries);
    }

    public has(search: ((value: V, self?: this) => boolean) | V): boolean {
        if (typeof search === "function") {
            search = search as (value: V, self?: this) => boolean;
            for (const v of this) {
                if (search(v, this)) {
                    return true;
                }
            }
            return false;
        }
        return super.has(search);
    }

    public find(search: (value: V, self: this) => boolean): V | undefined {
        search = search as (value: V, self: this) => boolean;
        for (const v of this) {
            if (search(v as V, this)) {
                return v;
            }
        }
        return undefined;
    }

    public filter(search: (value: V, self: this) => boolean): AdvancedSet<V> {
        search = search as (value: V, self: this) => boolean;
        const results: AdvancedSet<V> = new AdvancedSet<V>();
        for (const v of this) {
            if (search(v as V, this)) {
                results.add(v);
            }
        }
        return results;
    }
}
