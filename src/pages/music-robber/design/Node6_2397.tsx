const img = "/projects/music-robber/figma/b73011a2-20d0-40fa-aa57-7618e90671cc.svg";

export default function Component() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full" data-node-id="6:2397" data-name="声域">
      <div className="content-stretch flex gap-[8px] h-[36px] items-center overflow-clip relative shrink-0 w-[820px]" data-node-id="31:4985" data-name="标题行｜声域">
        <div className="relative shrink-0 size-[28px]" data-node-id="31:4986" data-name="图标｜声域">
          <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={img} />
        </div>
        <p className="[word-break:break-word] font-['Noto_Sans_SC'] font-bold font-bold leading-[36px] relative shrink-0 text-[#121212] text-[22px] w-[784px]" data-node-id="6:2398">
          声域
        </p>
      </div>
      <div className="[word-break:break-word] font-['Noto_Sans_SC'] font-normal leading-[0] relative shrink-0 text-[#121212] text-[18px] w-[820px]" data-node-id="6:2399">
        <p className="leading-[30px] mb-0">用户选择歌曲、广播范围与持续时间后，形成一个临时音乐区域，其他用户主动试听</p>
        <p className="leading-[30px]">设计目的：让附近用户的实时分享成为可感知的发现入口</p>
      </div>
    </div>
  );
}
