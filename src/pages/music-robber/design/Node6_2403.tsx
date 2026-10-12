const img = "/projects/music-robber/figma/79c75687-160e-415f-80af-3375b3ad2699.svg";

export default function Component() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full" data-node-id="6:2403" data-name="城市声音记忆">
      <div className="content-stretch flex gap-[8px] h-[36px] items-center overflow-clip relative shrink-0 w-[820px]" data-node-id="31:4995" data-name="标题行｜城市声音记忆">
        <div className="relative shrink-0 size-[28px]" data-node-id="31:4996" data-name="图标｜城市声音记忆">
          <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={img} />
        </div>
        <p className="[word-break:break-word] font-['Noto_Sans_SC'] font-bold font-bold leading-[36px] relative shrink-0 text-[#121212] text-[22px] w-[784px]" data-node-id="6:2404">
          城市声音记忆
        </p>
      </div>
      <div className="[word-break:break-word] font-['Noto_Sans_SC'] font-normal leading-[0] relative shrink-0 text-[#121212] text-[18px] w-[820px]" data-node-id="6:2405">
        <p className="leading-[30px] mb-0">将地点中出现的广播、收藏与回应沉淀下来，让用户回看“在哪里遇见了这首歌”</p>
        <p className="leading-[30px]">设计目的：让歌曲与空间经历建立关联</p>
      </div>
    </div>
  );
}
