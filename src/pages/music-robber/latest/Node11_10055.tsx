const imgStateActivate = "/projects/music-robber/figma/fd2faea6-1735-4fc4-abfd-9cefc6216340.svg";
const imgStateActivate1 = "/projects/music-robber/figma/c5b21e90-ecad-48a9-9691-7fcb19215d23.svg";
const imgIconMusicVault = "/projects/music-robber/figma/b00e2f29-27ad-4029-9fe5-d4190d290242.svg";
const imgIconRobberInfo = "/projects/music-robber/figma/3ac6eff8-c71c-4bcb-9d75-b2edc3173ed2.svg";

type IconPlazaProps = {
  className?: string;
  state?: "Activate";
};

function IconPlaza({ className }: IconPlazaProps) {
  return (
    <div className={className || "relative size-[52px]"} data-node-id="11:8376">
      <img decoding="async" alt="" className="absolute block inset-0 max-w-none size-full" src={imgStateActivate} />
    </div>
  );
}

type IconRobberyHubProps = {
  className?: string;
  state?: "Activate";
};

function IconRobberyHub({ className }: IconRobberyHubProps) {
  return (
    <div className={className || "relative size-[52px]"} data-node-id="11:8369">
      <img decoding="async" alt="" className="absolute block inset-0 max-w-none size-full" src={imgStateActivate1} />
    </div>
  );
}

export default function Frame724() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative size-full" data-node-id="11:10055">
      <div className="h-[78px] relative shrink-0 w-full" data-node-id="11:10056">
        <IconRobberyHub className="absolute left-0 size-[64px] top-0" />
        <div className="[word-break:break-word] absolute content-stretch flex flex-col gap-[16px] items-start left-[88px] not-italic text-[24px] text-black top-[2px] w-[531px]" data-node-id="11:10151">
          <div className="content-stretch flex font-['PingFang_SC'] font-semibold gap-[8px] items-start leading-[24px] relative shrink-0 w-[150px] whitespace-nowrap" data-node-id="11:10152">
            <p className="relative shrink-0" data-node-id="11:10153">
              Robbery Hub
            </p>
            <p className="relative shrink-0" data-node-id="11:10154">
              强盗工作室
            </p>
          </div>
          <p className="font-['PingFang_SC'] font-normal leading-[36px] min-w-full relative shrink-0 w-[min-content]" data-node-id="11:10155">
            实现APP的核心功能，包括 Robbing 和 Exploring
          </p>
        </div>
      </div>
      <div className="h-[78px] relative shrink-0 w-full" data-node-id="11:10059">
        <div className="absolute left-0 size-[64px] top-0" data-node-id="11:10060" data-name="Icon-Music vault">
          <img decoding="async" alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconMusicVault} />
        </div>
        <div className="[word-break:break-word] absolute content-stretch flex flex-col gap-[16px] items-start left-[88px] not-italic text-[24px] text-black top-[4px] w-[531px]" data-node-id="11:10156">
          <div className="content-stretch flex font-['PingFang_SC'] font-semibold gap-[8px] items-start leading-[24px] relative shrink-0 w-[150px] whitespace-nowrap" data-node-id="11:10157">
            <p className="relative shrink-0" data-node-id="11:10158">
              Music Vault
            </p>
            <p className="relative shrink-0" data-node-id="11:10159">
              音乐宝库
            </p>
          </div>
          <p className="font-['PingFang_SC'] font-normal leading-[36px] min-w-full relative shrink-0 w-[min-content]" data-node-id="11:10160">
            检索收集到的音乐，交易音乐或者补全专辑
          </p>
        </div>
      </div>
      <div className="h-[78px] relative shrink-0 w-full" data-node-id="11:10062">
        <IconPlaza className="absolute left-0 size-[64px] top-0" />
        <div className="[word-break:break-word] absolute content-stretch flex flex-col gap-[16px] items-start left-[88px] not-italic text-[24px] text-black top-[2px] w-[531px]" data-node-id="11:10161">
          <div className="content-stretch flex font-['PingFang_SC'] font-semibold gap-[8px] items-start leading-[24px] relative shrink-0 w-[150px] whitespace-nowrap" data-node-id="11:10162">
            <p className="relative shrink-0" data-node-id="11:10163">
              Plaza
            </p>
            <p className="relative shrink-0" data-node-id="11:10164">
              广场
            </p>
          </div>
          <p className="font-['PingFang_SC'] font-normal leading-[36px] min-w-full relative shrink-0 w-[min-content]" data-node-id="11:10165">
            关注全球/地区抢劫信息以及音乐市场动向
          </p>
        </div>
      </div>
      <div className="h-[78px] relative shrink-0 w-full" data-node-id="11:10065">
        <div className="absolute left-0 size-[64px] top-0" data-node-id="11:10066" data-name="Icon-Robber info">
          <img decoding="async" alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconRobberInfo} />
        </div>
        <div className="[word-break:break-word] absolute content-stretch flex flex-col gap-[16px] items-start left-[88px] not-italic text-[24px] text-black top-0 w-[531px]" data-node-id="11:10166">
          <div className="content-stretch flex font-['PingFang_SC'] font-semibold gap-[8px] items-start leading-[24px] relative shrink-0 w-[150px] whitespace-nowrap" data-node-id="11:10167">
            <p className="relative shrink-0" data-node-id="11:10168">
              About Me
            </p>
            <p className="relative shrink-0" data-node-id="11:10169">
              关于我
            </p>
          </div>
          <p className="font-['PingFang_SC'] font-normal leading-[36px] min-w-full relative shrink-0 w-[min-content]" data-node-id="11:10170">
            强盗个人信息
          </p>
        </div>
      </div>
    </div>
  );
}
