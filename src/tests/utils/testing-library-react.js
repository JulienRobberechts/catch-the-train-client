// to use like this:
// getByText(withTextContent('xxxx'))
export const withTextContent = textContent => (content, node) => {
  const hasExactText = node => node.textContent === textContent;
  const nodeHasText = hasExactText(node);
  const childrenDontHaveText = Array.from(node.children).every(
    child => !hasExactText(child)
  );

  return nodeHasText && childrenDontHaveText;
};

// to use like this:
// expectNotToBeInTheDocument(withTextContent('xxxx'))
export function notExpectInTheDocument(method) {
  const params = Array.prototype.slice.call(arguments, 1);
  params.forEach(p => expect(method.call(null, p)).not.toBeInTheDocument());
}
