const imgCover = "/projects/music-robber/figma/8bf8263f-4a32-40a9-b385-a7f41df791d4.png";
const imgMusicControlButtons = "/projects/music-robber/figma/9f4247c2-5b54-4a67-bec2-4c80245e8326.svg";
const imgStateDefault = "/projects/music-robber/figma/aac3c6b0-7782-4d59-80ef-65cb0e23f438.svg";
const imgStateDefault1 = "/projects/music-robber/figma/39885400-16bc-4991-8aa2-91ce233d6f81.svg";
const imgContent = "/projects/music-robber/figma/aa4c2887-fe5e-4bff-96d5-5134a11afa24.png";
const imgIPhone16ProBlackTitaniumPortrait = "/projects/music-robber/figma/39d5f61d-f807-4937-b5d7-b41ea9a52405.png";
const imgRectangle17 = "/projects/music-robber/figma/5d745d26-77b8-40cd-905b-ac6af3be7d3b.svg";
const imgLine9 = "/projects/music-robber/figma/d686b84c-c0e8-4f6a-a94f-de9b448ca842.svg";
const imgRectangle19 = "/projects/music-robber/figma/04286b11-0013-4f6c-bf72-0019af92bea4.svg";
const imgLine14 = "/projects/music-robber/figma/7be4b52a-9d09-4fbb-bc1d-eb868a45708b.svg";
const imgIconRobberyHub = "/projects/music-robber/figma/732bfe7f-27fd-44a3-8a51-4edbd067a6ec.svg";
const imgIconMusicVault = "/projects/music-robber/figma/3e81df00-6076-4d2a-b642-0c8838dffd08.svg";
const imgGroup = "/projects/music-robber/figma/436dc2c5-4426-4747-a57f-fc16fcb01296.svg";
const imgGroup1 = "/projects/music-robber/figma/e8547392-0c9b-46ab-9ca5-54261f143a1d.svg";
const imgCellularConnection = "/projects/music-robber/figma/28716334-a98e-4208-b9a3-5524178ad5ae.svg";
const imgWifi = "/projects/music-robber/figma/9d66bf60-f1a1-4b57-b662-1cf427ce9bc0.svg";
const imgBattery = "/projects/music-robber/figma/804d55b6-2444-4ec6-954b-3546c23ee1af.svg";

type CurrentSongProps = {
  className?: string;
  property1?: "1";
};

function CurrentSong({ className }: CurrentSongProps) {
  return (
    <div className={className || "bg-[rgba(255,255,255,0)] content-stretch flex gap-[var(--sapce\\/16,16px)] items-center pl-[var(--sapce\\/8,8px)] pr-[var(--sapce\\/16,16px)] py-[var(--sapce\\/6,6px)] relative rounded-[var(--sapce\\/12,12px)] w-[360px]"} data-node-id="2:414">
      <div className="relative rounded-[var(--sapce\/8,8px)] shrink-0 size-[40px]" data-node-id="2:415" data-name="Cover">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[var(--sapce\/8,8px)] size-full" decoding="async" src={imgCover} />
      </div>
      <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="2:416" data-name="Info">
        <p className="[word-break:break-word] font-['PingFang_SC'] font-bold leading-[16px] not-italic relative shrink-0 text-[16px] text-[color:var(--neutral\/0,white)] tracking-[-0.32px] whitespace-nowrap" data-node-id="2:417">
          Manchild
        </p>
      </div>
      <div className="relative shrink-0 size-[20px]" data-node-id="2:418" data-name="Music Control Buttons">
        <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgMusicControlButtons} />
      </div>
    </div>
  );
}

type IconRobberInfoProps = {
  className?: string;
  state?: "Default";
};

function IconRobberInfo({ className }: IconRobberInfoProps) {
  return (
    <div className={className || "relative size-[52px]"} data-node-id="11:8381">
      <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgStateDefault} />
    </div>
  );
}

type IconPlazaProps = {
  className?: string;
  state?: "Default";
};

function IconPlaza({ className }: IconPlazaProps) {
  return (
    <div className={className || "relative size-[52px]"} data-node-id="11:8372">
      <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgStateDefault1} />
    </div>
  );
}

export default function IPhone16Pro() {
  return (
    <div className="relative size-full" data-node-id="11:8496" data-name="iPhone 16 Pro">
      <div className="absolute h-[874px] left-0 overflow-clip rounded-[60px] top-0 w-[402px]" data-node-id="11:8497" data-name="Content">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[60px] size-full" decoding="async" src={imgContent} />
        <div className="absolute bg-[var(--neutral\/700,black)] border border-[var(--neutral\/300,#999)] border-solid h-[874px] left-0 overflow-x-clip overflow-y-auto top-0 w-[402px]" data-node-id="11:8498" data-name="8">
          <div className="absolute h-[179px] left-[14px] top-[211px] w-[372px]" data-node-id="11:8499">
            <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgRectangle17} />
          </div>
          <div className="-translate-x-1/2 absolute h-0 left-[calc(50%-1px)] top-[389px] w-[278px]" data-node-id="11:8500">
            <div className="absolute inset-[-1px_0_0_0]">
              <img alt="" className="block max-w-none size-full" decoding="async" src={imgLine9} />
            </div>
          </div>
          <div className="absolute h-[179px] left-[14px] top-[457px] w-[372px]" data-node-id="11:8501">
            <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgRectangle19} />
          </div>
          <div className="absolute h-0 left-[28px] top-[633px] w-[350px]" data-node-id="11:8502">
            <div className="absolute inset-[-1px_0_0_0]">
              <img alt="" className="block max-w-none size-full" decoding="async" src={imgLine14} />
            </div>
          </div>
          <p className="-translate-x-1/2 [word-break:break-word] absolute font-['PingFang_SC'] font-bold leading-[16px] left-[200px] not-italic text-[16px] text-center text-white top-[651px] tracking-[-0.32px] w-[342px]" data-node-id="11:8503">
            Exploring
          </p>
          <p className="-translate-x-1/2 [word-break:break-word] absolute font-['PingFang_SC'] font-bold leading-[16px] left-[200px] not-italic text-[16px] text-center text-white top-[405px] tracking-[-0.32px] w-[342px]" data-node-id="11:8504">
            Robbing
          </p>
          <div className="-translate-x-1/2 absolute backdrop-blur-[10px] bg-[rgba(0,0,0,0.65)] content-stretch flex h-[146px] items-end left-1/2 overflow-clip px-[var(--sapce\/24,24px)] py-[var(--sapce\/16,16px)] top-[-1px] w-[402px]" data-node-id="11:8505" data-name="Floating top">
            <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="I11:8505;641:2808" data-name="Big heading">
              <p className="[word-break:break-word] font-['PingFang_SC'] font-bold leading-[24px] not-italic relative shrink-0 text-[32px] text-white whitespace-nowrap" data-node-id="I11:8505;641:2808;610:2949">
                Robbery Hub
              </p>
            </div>
          </div>
          <div className="-translate-x-1/2 absolute backdrop-blur-[10px] bg-[rgba(0,0,0,0.7)] bottom-[-5px] content-stretch flex h-[86px] items-center justify-between left-1/2 overflow-clip px-[47px] py-[17px] shadow-[0px_-8px_20px_0px_black] w-[402px]" data-node-id="11:8506" data-name="Bottom tab bar">
            <div className="relative shrink-0 size-[52px]" data-node-id="I11:8506;554:2005" data-name="Icon-Robbery hub">
              <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgIconRobberyHub} />
            </div>
            <div className="relative shrink-0 size-[52px]" data-node-id="I11:8506;554:2006" data-name="Icon-Music vault">
              <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgIconMusicVault} />
            </div>
            <IconPlaza className="relative shrink-0 size-[52px]" />
            <IconRobberInfo className="relative shrink-0 size-[52px]" />
          </div>
          <CurrentSong className="absolute bg-[rgba(255,255,255,0)] bottom-[74px] content-stretch flex gap-[var(--sapce\/16,16px)] items-center left-[calc(3.3%-0.93px)] pl-[var(--sapce\/8,8px)] pr-[var(--sapce\/16,16px)] py-[var(--sapce\/6,6px)] right-[calc(5.1%-0.9px)] rounded-[var(--sapce\/12,12px)]" />
          <div className="absolute inset-[calc(26.77%-0.46px)_calc(4.71%-0.91px)_calc(55.22%+0.1px)_calc(6.97%-0.86px)]" data-node-id="11:8508" data-name="Group">
            <div className="absolute inset-[-0.32%_-0.14%]">
              <img alt="" className="block max-w-none size-full" decoding="async" src={imgGroup} />
            </div>
          </div>
          <div className="absolute h-[153.28px] left-[52px] overflow-clip top-[486px] w-[295.76px]" data-node-id="11:8565" data-name="_图层_1">
            <div className="absolute inset-[0.14%_0.08%_0.15%_0.07%]" data-node-id="11:8566" data-name="Group">
              <div className="absolute inset-[-0.33%_-0.17%]">
                <img alt="" className="block max-w-none size-full" decoding="async" src={imgGroup1} />
              </div>
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col h-[50px] items-start left-[calc(-1.27%-1.03px)] pt-[21px] right-[calc(-1.02%-1.02px)] top-[-1px]" data-node-id="11:8597" data-name="Status Bar - iPhone">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="I11:8597;2969:19841" data-name="Frame">
              <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-w-px pl-[16px] pr-[6px] relative" data-node-id="I11:8597;2969:18119" data-name="Time">
                <p className="[word-break:break-word] font-['SF_Pro'] font-bold font-[590] leading-[22px] relative shrink-0 text-[17px] text-[color:var(--neutral\/0,white)] text-center whitespace-nowrap" data-node-id="I11:8597;2969:18120" style={{ fontVariationSettings: '"wdth" 100' }}>
                  9:41
                </p>
              </div>
              <div className="h-[10px] relative shrink-0 w-[124px]" data-node-id="I11:8597;2969:18121" data-name="Dynamic Island spacer" />
              <div className="content-stretch flex flex-[1_0_0] gap-[7px] items-center justify-center min-w-px pl-[6px] pr-[16px] relative" data-node-id="I11:8597;2969:18122" data-name="Levels">
                <div className="h-[12.226px] relative shrink-0 w-[19.2px]" data-node-id="I11:8597;2969:18123" data-name="Cellular Connection">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgCellularConnection} />
                </div>
                <div className="h-[12.328px] relative shrink-0 w-[17.142px]" data-node-id="I11:8597;2969:18124" data-name="Wifi">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgWifi} />
                </div>
                <div className="h-[13px] relative shrink-0 w-[27.328px]" data-node-id="I11:8597;2969:18125" data-name="Battery">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgBattery} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[920px] left-[-24px] top-[-23px] w-[450px]" data-node-id="11:8598" data-name="iPhone 16 Pro - Black Titanium - Portrait">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" decoding="async" src={imgIPhone16ProBlackTitaniumPortrait} />
      </div>
    </div>
  );
}
