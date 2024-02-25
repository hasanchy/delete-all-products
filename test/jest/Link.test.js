import renderer from 'react-test-renderer';
import Link from '../../src/public/ts/components/Link';

it('changes the class when hovered', () => {
	const component = renderer.create(
		<Link page="http://www.google.com">Google</Link>,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback
	renderer.act(() => {
		tree.props.onMouseEnter();
	});
	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback
	renderer.act(() => {
		tree.props.onMouseLeave();
	});
	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});