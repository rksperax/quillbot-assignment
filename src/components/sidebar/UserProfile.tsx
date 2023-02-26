import React, { FC } from "react";

export interface UserProfileProps {
  avatar: string;
  name: string;
}

export const UserProfile: FC<UserProfileProps> = ({
  avatar,
  name,
}: UserProfileProps) => (
  <div className="flex flex-shrink-0 flex-col items-center pt-[42px] pb-5 border-b border-[#394B61] space-y-[11px]">
    <img className="w-[91px] h-[91px]" src={avatar} alt={name} />
    <p className="text-[#D4D7DD] text-[20px] leading-[27px] font-semibold">
      {name}
    </p>
  </div>
);
