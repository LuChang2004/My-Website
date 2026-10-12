const imgStateActivate = "/projects/music-robber/figma/045d624c-849c-46f0-b62c-ece0a4cba774.svg";
const imgStateActivate1 = "/projects/music-robber/figma/ba298cf6-bf0e-4449-b565-6de18c289042.svg";
const imgStateActivate2 = "/projects/music-robber/figma/3be76018-a015-4553-8e4a-ae0f77770fa9.svg";
const imgStateActivate3 = "/projects/music-robber/figma/dfb9b205-b510-402e-928d-74286b34eb71.svg";

type IconRobberInfoProps = {
  className?: string;
  state?: "Activate";
};

function IconRobberInfo({ className }: IconRobberInfoProps) {
  return (
    <div className={className || "relative size-[52px]"} data-node-id="11:8385">
      <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgStateActivate} />
    </div>
  );
}

type IconPlazaProps = {
  className?: string;
  state?: "Activate";
};

function IconPlaza({ className }: IconPlazaProps) {
  return (
    <div className={className || "relative size-[52px]"} data-node-id="11:8376">
      <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgStateActivate1} />
    </div>
  );
}

type IconMusicVaultProps = {
  className?: string;
  state?: "Activate";
};

function IconMusicVault({ className }: IconMusicVaultProps) {
  return (
    <div className={className || "relative size-[52px]"} data-node-id="11:8361">
      <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgStateActivate2} />
    </div>
  );
}

function Frame716({ className }: { className?: string }) {
  return (
    <div className={className || "[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start not-italic relative text-[24px] text-black w-[531px]"} data-node-id="11:8610">
      <div className="content-stretch flex flex-col font-['PingFang_SC'] font-bold gap-[8px] items-start leading-[24px] relative shrink-0 w-[150px]" data-node-id="11:8611">
        <p className="opacity-0 relative shrink-0 w-full" data-node-id="11:8612">
          Robbery Hub
        </p>
        <p className="opacity-0 relative shrink-0 w-full" data-node-id="11:8613">
          强盗工作室
        </p>
      </div>
      <p className="font-['PingFang_SC'] leading-[36px] min-w-full opacity-0 relative shrink-0 w-[min-content]" data-node-id="11:8614">
        实现APP的核心功能，包括 Robbing 和 Exploring
      </p>
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
      <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgStateActivate3} />
    </div>
  );
}

export default function Frame724() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start relative size-full" data-node-id="11:8607">
      <div className="h-[126px] relative shrink-0 w-full" data-node-id="11:8608">
        <IconRobberyHub className="absolute left-0 size-[64px] top-0" />
        <Frame716 className="[word-break:break-word] absolute content-stretch flex flex-col gap-[16px] items-start left-[88px] not-italic text-[24px] text-black top-[2px] w-[531px]" />
      </div>
      <div className="h-[128px] relative shrink-0 w-full" data-node-id="11:8615">
        <IconMusicVault className="absolute left-0 size-[64px] top-0" />
        <div className="[word-break:break-word] absolute content-stretch flex flex-col gap-[16px] items-start left-[88px] not-italic text-[24px] text-black top-[4px] w-[531px]" data-node-id="11:8617">
          <div className="content-stretch flex flex-col font-['PingFang_SC'] font-bold gap-[8px] items-start leading-[24px] relative shrink-0 w-[150px]" data-node-id="I11:8617;11:8611">
            <p className="opacity-0 relative shrink-0 w-full" data-node-id="I11:8617;11:8612">
              Music Vault
            </p>
            <p className="opacity-0 relative shrink-0 w-full" data-node-id="I11:8617;11:8613">
              音乐宝库
            </p>
          </div>
          <p className="font-['PingFang_SC'] leading-[36px] min-w-full opacity-0 relative shrink-0 w-[min-content]" data-node-id="I11:8617;11:8614">
            检索收集到的音乐，交易音乐或者补全专辑
          </p>
        </div>
      </div>
      <div className="h-[126px] relative shrink-0 w-full" data-node-id="11:8618">
        <IconPlaza className="absolute left-0 size-[64px] top-0" />
        <div className="[word-break:break-word] absolute content-stretch flex flex-col gap-[16px] items-start left-[88px] not-italic text-[24px] text-black top-[2px] w-[531px]" data-node-id="11:8620">
          <div className="content-stretch flex flex-col font-['PingFang_SC'] font-bold gap-[8px] items-start leading-[24px] relative shrink-0 w-[150px]" data-node-id="I11:8620;11:8611">
            <p className="opacity-0 relative shrink-0 w-full" data-node-id="I11:8620;11:8612">
              Plaza
            </p>
            <p className="opacity-0 relative shrink-0 w-full" data-node-id="I11:8620;11:8613">
              广场
            </p>
          </div>
          <p className="font-['PingFang_SC'] leading-[36px] min-w-full opacity-0 relative shrink-0 w-[min-content]" data-node-id="I11:8620;11:8614">
            关注全球/地区抢劫信息以及音乐市场动向
          </p>
        </div>
      </div>
      <div className="h-[124px] relative shrink-0 w-full" data-node-id="11:8621">
        <IconRobberInfo className="absolute left-0 size-[64px] top-0" />
        <div className="[word-break:break-word] absolute content-stretch flex flex-col gap-[16px] items-start left-[88px] not-italic text-[24px] text-black top-0 w-[531px]" data-node-id="11:8623">
          <div className="content-stretch flex flex-col font-['PingFang_SC'] font-bold gap-[8px] items-start leading-[24px] relative shrink-0 w-[150px]" data-node-id="I11:8623;11:8611">
            <p className="opacity-0 relative shrink-0 w-full" data-node-id="I11:8623;11:8612">
              About Me
            </p>
            <p className="opacity-0 relative shrink-0 w-full" data-node-id="I11:8623;11:8613">
              关于我
            </p>
          </div>
          <p className="font-['PingFang_SC'] leading-[36px] min-w-full opacity-0 relative shrink-0 w-[min-content]" data-node-id="I11:8623;11:8614">
            强盗个人信息
          </p>
        </div>
      </div>
    </div>
  );
}
