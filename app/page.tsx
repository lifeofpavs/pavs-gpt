import { BoltIcon, ExclamationTriangleIcon, SunIcon} from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center px-2 justify-center">
      <h1 className="text-5xl font-bold mb-20">Pavs GPT</h1>
      <div className="flex flex-row space-x-4 text-center flex-wrap items-center justify-center space-y-4">
        <div>
          <div className="flex flex-col items-center justify-center mb-5 space-y-4">
            <SunIcon className="h-8 w-8" />
            <h1>Examples</h1>
          </div>
          <div className="space-y-2">
            <p className="infoText">Explain something to me</p>
            <p className="infoText">
              &quot;What is the difference between a dog and a cat?&quot;
            </p>
            <p className="infoText">
              &quot;What is the difference between a dog and a cat?&quot;
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <BoltIcon className="h-8 w-8" />
            <h1>Capabilities</h1>
          </div>
          <div className="space-y-2">
            <p className="infoText">Change the ChatGPT model to use</p>
            <p className="infoText">
              &quot;Messages are stores in Firebase&quot;s Firestore
            </p>
            <p className="infoText">
              Hot toast notifications when ChatGPT is thinking!
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h1>Limitations</h1>
          </div>
          <div className="space-y-2">
            <p className="infoText">May ocasionally generate incorrect information</p>
            <p className="infoText">
              May ocasionally produce harmful instructions or biased content
            </p>
            <p className="infoText">
              Limited knowledge of world and events after 2021
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
