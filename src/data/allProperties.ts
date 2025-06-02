const modules = import.meta.glob('../properties/*.json', { eager: true });
const properties = Object.values(modules).map((mod: any) => mod.default || mod);
export default properties; 