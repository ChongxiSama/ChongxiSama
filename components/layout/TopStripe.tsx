const TopStripe = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] flex z-50 md:hidden">
      <div className="bg-rl-teal w-1/3"></div>
      <div className="bg-rl-gold w-1/3"></div>
      <div className="bg-rl-red w-1/3"></div>
    </div>
  );
};

export default TopStripe;
