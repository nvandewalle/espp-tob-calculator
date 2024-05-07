const Stepper = ({ steps, active, setActive }) => {
  return (
    <>
      <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base my-8">
        {steps.map((step, index) => {
          if (index === steps.length - 1) {
            return (
              <li
                className={`${
                  active === index && "text-blue-600 dark:text-blue-500"
                } flex items-center cursor-pointer`}
                onClick={() => setActive(index)}
              >
                <span className="me-2">4</span>
                Email
              </li>
            );
          }

          return (
            <li
              className={`${
                active === index && "text-blue-600 dark:text-blue-500"
              } flex md:w-full items-center  sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 cursor-pointer`}
            >
              <span
                className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
                onClick={() => setActive(index)}
              >
                <span className="ms-2 me-2">{index + 1}</span>
                {step.title}
              </span>
            </li>
          );
        })}
      </ol>

      {steps[active].content}
    </>
  );
};

export default Stepper;
