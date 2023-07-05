import type { IVoucherItem } from '@/@types/voucher';

const VoucherItem = ({ voucherApply, setVoucherApply, voucher }: IVoucherItem) => {
  const handleChooseVoucher = () => {
    const voucherItemElement = document.getElementById(voucher._id);
    if (voucherItemElement?.classList.contains('bg-[#9ad5eef0]')) {
      voucherItemElement?.classList.remove('bg-[#9ad5eef0]');
      voucherItemElement?.classList.add('bg-primary-color');
      setVoucherApply(voucher);
    } else {
      voucherItemElement?.classList.remove('bg-primary-color');
      voucherItemElement?.classList.add('bg-[#9ad5eef0]');
      setVoucherApply(undefined);
    }
  };

  return (
    <div
      id={voucher._id}
      className={`flex flex-col gap-1 px-4 py-2 ${
        voucherApply && voucherApply._id === voucher._id ? 'bg-primary-color' : 'bg-[#9ad5eef0]'
      } cursor-pointer rounded-lg`}
      onClick={handleChooseVoucher}
    >
      <h1 className='mb-0 text-base font-bold'>Code: {voucher.code}</h1>
      <p className='mb-0 text-base'>{`Description: ${voucher.name}. ${voucher.description}`}</p>
      <p className='mb-0 text-base'>Remaining: {voucher.applied_user.at(0)?.remaining}</p>
    </div>
  );
};

export default VoucherItem;
