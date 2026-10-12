const imgCover = "/projects/music-robber/figma/39529e86-0e5e-4495-9c02-7dabc6c6ec4b.png";
const imgMusicControlButtons = "/projects/music-robber/figma/befecccf-964a-4587-8df0-71bf62eab3d5.svg";

export default function OnePiece() {
  return (
    <div className="border border-[rgba(255,0,47,0.85)] border-solid overflow-clip relative rounded-[var(--sapce\/16,16px)] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.5)] size-full" data-node-id="11:8665" data-name="One piece">
      <div aria-hidden className="absolute backdrop-blur-[6px] bg-[rgba(245,0,45,0.05)] inset-0 pointer-events-none rounded-[var(--sapce\/16,16px)]" />
      <div className="absolute border-[0.5px] border-solid border-white left-[14px] rounded-[10px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.5)] size-[72px] top-[14px]" data-node-id="I11:8665;1773:22310" data-name="Cover">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" decoding="async" src={imgCover} />
      </div>
      <div className="absolute left-[318px] size-[20px] top-[18px]" data-node-id="I11:8665;1773:22311" data-name="Music Control Buttons">
        <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgMusicControlButtons} />
      </div>
      <div className="[word-break:break-word] absolute content-stretch flex flex-col items-start left-[101px] not-italic text-[color:var(--neutral\/0,white)] top-[13px] w-[217px]" data-node-id="I11:8665;1773:22312" data-name="Info">
        <p className="font-['PingFang_SC'] font-bold leading-[18px] relative shrink-0 text-[16px] w-full" data-node-id="I11:8665;1773:22313">
          Young And Beautiful
        </p>
        <p className="font-['PingFang_SC'] leading-[16px] relative shrink-0 text-[14px] w-full" data-node-id="I11:8665;1773:22314">
          Lana Del Rey
        </p>
      </div>
      <div className="absolute bg-[var(--brand\/primary\/0,#f5002d)] content-stretch flex items-center justify-center left-[236px] overflow-clip py-[6px] rounded-[var(--sapce\/16,16px)] top-[58px] w-[113px]" data-node-id="I11:8665;1773:22315">
        <p className="[word-break:break-word] font-['PingFang_SC'] font-bold leading-[16px] not-italic relative shrink-0 text-[16px] text-[color:var(--neutral\/0,white)] tracking-[-0.32px] whitespace-nowrap" data-node-id="I11:8665;1773:22316">
          Collect
        </p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_32px_0px_var(--brand\/primary\/0,#f5002d)]" />
    </div>
  );
}
