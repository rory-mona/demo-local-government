export default function WelcomePanel() {
  return (
    <section className="rounded-md border border-gray-200 bg-white p-4 shadow-[inset_0_-2px_0_rgba(0,0,0,0.06)]">
      <div className="border-b-2 border-amber-400 pb-3">
        <h2 className="text-[15px] font-semibold text-gray-800">Welcome!</h2>
      </div>

      <div className="mt-4 space-y-4 text-[13px] leading-6 text-gray-700">
        <p>
          Submit your personal details for the Kadira State Resident
          Registration.
        </p>
        <p>
          Filling out the Online form is the first step in the process of
          registration.
        </p>
        <p>
          You will still need to complete your registration at an{" "}
          <a className="font-semibold text-emerald-700 underline" href="#">
            enrolment station
          </a>{" "}
          where we will capture your biometric information.
        </p>

        <div className="mt-4">
          <p className="font-semibold">Before Starting: (Review)</p>
          <ol className="mt-2 list-decimal space-y-2 pl-5">
            <li>
              <a className="text-emerald-700 underline" href="#">
                How to fill the registration form
              </a>
            </li>
            <li>
              <a className="text-emerald-700 underline" href="#">
                List of documents you will need
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
