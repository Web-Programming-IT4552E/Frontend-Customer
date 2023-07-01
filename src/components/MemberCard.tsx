import React from 'react';
import { AiFillCrown } from 'react-icons/ai';

import type { RankEnum } from '@/@types/rank';
import { RankColor } from '@/utils/rank';

const MemberCard: React.FC<{
  rank: RankEnum;
  rank_point: number;
  point: number;
}> = ({ rank, rank_point, point }) => {
  return (
    <div
      className={`flex h-[200px] w-full items-center justify-center rounded-lg`}
      style={{
        backgroundColor: RankColor[rank],
      }}
    >
      <div className="w-5/6">
        <div className="mb-[40px] flex items-center text-[24px] font-bold uppercase text-white">
          <AiFillCrown className={`mr-2`} />
          Member
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-bold text-white">Rank Point:</p>
            <p className="font-raleway font-semibold text-white">
              {rank_point}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Bonus Point:</p>
            <p className="font-raleway font-semibold text-white">{point}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
