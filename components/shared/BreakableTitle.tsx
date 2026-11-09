import { Fragment } from 'react';

/**
 * Renders a title so it can wrap after slashes (e.g. "Redemption/Salvation"),
 * which otherwise overflows narrow screens as one long word.
 */
export const BreakableTitle = ({ text }: { text: string }) => (
  <>
    {text.split('/').map((part, index) => (
      <Fragment key={index}>
        {index > 0 && (
          <>
            /<wbr />
          </>
        )}
        {part}
      </Fragment>
    ))}
  </>
);

export default BreakableTitle;
