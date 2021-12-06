import { appStore } from "./3.TableControlsAsync";


beforeEach(() => {
	appStore.reset();
});

test('Store a list of items', () => {
	expect(appStore.devsList).toHaveLength(0);
	expect(Array.isArray(appStore.devsList)).toBeTruthy();
});

test('Allow maintaining a *current* string as it gets typed', () => {
	expect(appStore.filter).toEqual('');
	
	appStore.updateFilter('a');
	expect(appStore.filter).toEqual('a');
	
	appStore.updateFilter('ab');
	expect(appStore.filter).toEqual('ab');
});

test('Ability to add items to devsList array', () => {
	appStore.addDeveloper({ id: 1, name: "Jack", sp: 12 });
	expect(appStore.devsList).toHaveLength(1);
});
