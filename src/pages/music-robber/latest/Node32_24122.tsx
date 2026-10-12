const img = "/projects/music-robber/figma/6e2a47ca-0889-4773-a25b-00301f354a6b.svg";

export default function Component() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full" data-node-id="32:24122" data-name="音乐碎片">
      <div className="content-stretch flex gap-[8px] h-[36px] items-center overflow-clip relative shrink-0 w-[820px]" data-node-id="32:24123" data-name="标题行｜音乐碎片">
        <div className="relative shrink-0 size-[28px]" data-node-id="32:24124" data-name="图标｜音乐碎片">
          <img decoding="async" alt="" className="absolute block inset-0 max-w-none size-full" src={img} />
        </div>
        <p className="[word-break:break-word] font-['Noto_Sans_SC'] font-bold font-bold leading-[36px] relative shrink-0 text-[#121212] text-[22px] w-[784px]" data-node-id="32:24129">
          音乐碎片
        </p>
      </div>
      <div className="[word-break:break-word] font-['Noto_Sans_SC'] font-normal font-normal leading-[0] relative shrink-0 text-[#121212] text-[18px] w-[820px]" data-node-id="32:24130">
        <p className="leading-[30px] mb-0">先呈现片段、情绪与模糊来源；通过试听或探索逐步展开歌曲信息</p>
        <p className="leading-[30px]">设计目的：保留发现的未知与期待，同时控制操作成本</p>
      </div>
    </div>
  );
}
