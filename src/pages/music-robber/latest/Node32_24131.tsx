const img = "/projects/music-robber/figma/0f0053b0-7c3f-43e6-889b-04ab9f0f8568.svg";

export default function Component() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full" data-node-id="32:24131" data-name="城市声音记忆">
      <div className="content-stretch flex gap-[8px] h-[36px] items-center overflow-clip relative shrink-0 w-[820px]" data-node-id="32:24132" data-name="标题行｜城市声音记忆">
        <div className="relative shrink-0 size-[28px]" data-node-id="32:24133" data-name="图标｜城市声音记忆">
          <img decoding="async" alt="" className="absolute block inset-0 max-w-none size-full" src={img} />
        </div>
        <p className="[word-break:break-word] font-['Noto_Sans_SC'] font-bold font-bold leading-[36px] relative shrink-0 text-[#121212] text-[22px] w-[784px]" data-node-id="32:24136">
          城市声音记忆
        </p>
      </div>
      <div className="[word-break:break-word] font-['Noto_Sans_SC'] font-normal font-normal leading-[0] relative shrink-0 text-[#121212] text-[18px] w-[820px]" data-node-id="32:24137">
        <p className="leading-[30px] mb-0">将地点中出现的广播、收藏与回应沉淀下来，让用户回看“在哪里遇见了这首歌”</p>
        <p className="leading-[30px]">设计目的：让歌曲与空间经历建立关联</p>
      </div>
    </div>
  );
}
