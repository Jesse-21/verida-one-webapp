import React from "react";

type NoSearchResultItemProps = {
  message: string;
} & React.ComponentPropsWithRef<"div">;

export const NoSearchResultItem: React.FunctionComponent<
  NoSearchResultItemProps
> = ({ message, ...otherProps }) => {
  return (
    <div {...otherProps}>
      <div className="rounded-xl bg-gray p-4">
        <p className="text-center text-sm text-primary/60">{message}</p>
      </div>
    </div>
  );
};
