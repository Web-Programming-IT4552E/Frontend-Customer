import React from "react";
import { AiFillCrown } from "react-icons/ai";
import { RankEnum } from "@/@types/rank";
import { RankColor } from "@/utils/rank";

const MemberCard: React.FC<{ rank: RankEnum, rank_point: number, point: number }> = ({ rank, rank_point, point }) => {
  return (
    <div className={`w-full h-[200px] rounded-lg flex items-center justify-center`} style={{
      backgroundColor: RankColor[rank]
    }}>
      <div className="w-5/6">
        <div className="flex items-center font-bold text-[24px] uppercase mb-[40px] text-white">
          <AiFillCrown className={`mr-2`} />
          {rank} Member
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-white font-bold">Rank Point:</p>
            <p className="font-semibold font-raleway text-white">{rank_point}</p>
          </div>
          <div>
            <p className="text-sm text-white font-bold">Bonus Point:</p>
            <p className="font-semibold font-raleway text-white">{point}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
