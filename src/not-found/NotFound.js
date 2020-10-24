import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "twin.macro";
import { theme } from "twin.macro";
import { SEO } from "../shared/SEO";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t("NotFound.title")} />
      <main tw="flex-1 relative overflow-y-auto py-6 max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 py-6 flex flex-col items-center">
        <Link title={t("NotFound.goBackToDashboard")} to="/">
          <svg tw="h-8 w-auto" fill="none" viewBox="0 0 34 32">
            <path
              fill={theme`colors.indigo.600`}
              d="M15.258 26.865a4.043 4.043 0 01-1.133 2.917A4.006 4.006 0 0111.253 31a3.992 3.992 0 01-2.872-1.218 4.028 4.028 0 01-1.133-2.917c.009-.698.2-1.382.557-1.981.356-.6.863-1.094 1.47-1.433-.024.109.09-.055 0 0l1.86-1.652a8.495 8.495 0 002.304-5.793c0-2.926-1.711-5.901-4.17-7.457.094.055-.036-.094 0 0A3.952 3.952 0 017.8 7.116a3.975 3.975 0 01-.557-1.98 4.042 4.042 0 011.133-2.918A4.006 4.006 0 0111.247 1a3.99 3.99 0 012.872 1.218 4.025 4.025 0 011.133 2.917 8.521 8.521 0 002.347 5.832l.817.8c.326.285.668.551 1.024.798.621.33 1.142.826 1.504 1.431a3.902 3.902 0 01-1.504 5.442c.033-.067-.063.036 0 0a8.968 8.968 0 00-3.024 3.183 9.016 9.016 0 00-1.158 4.244zM19.741 5.123c0 .796.235 1.575.676 2.237a4.01 4.01 0 001.798 1.482 3.99 3.99 0 004.366-.873 4.042 4.042 0 00.869-4.386 4.02 4.02 0 00-1.476-1.806 3.994 3.994 0 00-5.058.501 4.038 4.038 0 00-1.175 2.845zM23.748 22.84c-.792 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.806 4.042 4.042 0 00.869 4.387 3.99 3.99 0 004.366.873A4.01 4.01 0 0027.08 29.1a4.039 4.039 0 00-.5-5.082 4 4 0 00-2.832-1.18zM34 15.994c0-.796-.235-1.574-.675-2.236a4.01 4.01 0 00-1.798-1.483 3.99 3.99 0 00-4.367.873 4.042 4.042 0 00-.869 4.387 4.02 4.02 0 001.476 1.806 3.993 3.993 0 002.226.678 4.003 4.003 0 002.832-1.18A4.04 4.04 0 0034 15.993z"
            />
            <path
              fill={theme`colors.indigo.600`}
              d="M5.007 11.969c-.793 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.807 4.042 4.042 0 00.869 4.386 4.001 4.001 0 004.366.873 4.011 4.011 0 001.798-1.483 4.038 4.038 0 00-.5-5.08 4.004 4.004 0 00-2.831-1.181z"
            />
          </svg>
        </Link>

        <svg tw="mt-16 sm:mt-24 md:mt-32 max-w-sm mx-auto flex-shrink-0" viewBox="0 0 1121 778">
          <circle cx="212.6" cy="103" r="64" fill={theme`colors.indigo.300`} />
          <path
            fill={theme`colors.gray.200`}
            d="M524 343c0 151-90 204-201 204s-200-53-200-204S323 0 323 0s201 192 201 343z"
          />
          <path
            fill={theme`colors.gray.700`}
            d="M316 524l2-127 86-156-85 137v-57l59-113-58 98 1-103 63-90-62 74 1-187-7 248 1-10-64-98 63 118-6 114-1-3-73-104 73 114v15h-1v1l-15 290h21l2-150 73-114-73 103z"
          />
          <path
            fill={theme`colors.gray.200`}
            d="M1121 405c0 124-74 167-165 167s-164-43-164-167 164-281 164-281 165 157 165 281z"
          />
          <path
            fill={theme`colors.gray.700`}
            d="M950 553l2-104 70-128-70 112 1-46 48-93-48 80 2-83 51-74-51 61 1-154-6 203 1-8-53-81 52 97-5 93v-2l-60-85 60 94-1 11v1l-12 237h16l2-122 61-93-61 84z"
          />
          <ellipse cx="554.6" cy="680.5" fill={theme`colors.gray.700`} rx="554.6" ry="28" />
          <ellipse cx="892.4" cy="726.8" fill={theme`colors.gray.700`} rx="95" ry="4.8" />
          <ellipse cx="548.7" cy="773.1" fill={theme`colors.gray.700`} rx="95" ry="4.8" />
          <ellipse cx="287.9" cy="734.3" fill={theme`colors.gray.700`} rx="217" ry="11" />
          <circle cx="97.1" cy="566.3" r="79" fill={theme`colors.gray.800`} />
          <path fill={theme`colors.gray.800`} d="M61 628h24l-1 43H60zM109 629h24l-1 43h-24z" />
          <ellipse
            cx="119.5"
            cy="732.6"
            fill={theme`colors.gray.800`}
            rx="7.5"
            ry="20"
            transform="rotate(-89 69 722)"
          />
          <ellipse
            cx="167.6"
            cy="732.2"
            fill={theme`colors.gray.800`}
            rx="7.5"
            ry="20"
            transform="rotate(-89 117 722)"
          />
          <circle cx="99.3" cy="546.3" r="27" fill={theme`colors.white`} />
          <circle cx="99.3" cy="546.3" r="9" fill={theme`colors.gray.700`} />
          <path
            fill={theme`colors.indigo.500`}
            d="M21 492c-6-29 15-57 47-64s62 11 68 40-15 39-47 45-62 8-68-21z"
          />
          <path
            fill={theme`colors.indigo.500`}
            d="M218 610c0 55-33 75-74 75h-2l-6-1c-36-2-65-22-65-74 0-53 68-120 73-125s74 70 74 125z"
          />
          <path
            fill={theme`colors.gray.700`}
            d="M142 676l27-37-27 41v5l-6-1 3-55v-5l-27-42 27 38v1l3-42-23-43 23 36 2-87v69l23-27-23 32-1 38 21-36-21 41v21l31-50-31 57z"
          />
          <circle cx="712.5" cy="565.4" r="79" fill={theme`colors.gray.800`} />
          <path
            fill={theme`colors.gray.800`}
            d="M697 635l22-7 13 41-23 7zM743 621l23-7 12 41-23 7z"
          />
          <ellipse
            cx="767.9"
            cy="732"
            fill={theme`colors.gray.800`}
            rx="20"
            ry="7.5"
            transform="rotate(-17 545 834)"
          />
          <ellipse
            cx="813.5"
            cy="716.9"
            fill={theme`colors.gray.800`}
            rx="20"
            ry="7.5"
            transform="rotate(-17 590 819)"
          />
          <circle cx="708.5" cy="545.7" r="27" fill={theme`colors.white`} />
          <circle cx="708.5" cy="545.7" r="9" fill={theme`colors.gray.700`} />
          <path
            fill={theme`colors.indigo.500`}
            d="M618 518c-15-26-4-59 24-75s63-9 77 17-2 41-30 57-57 26-71 1zM572 600c0 51-30 68-68 68h-7c-34-2-60-21-60-68 0-48 63-110 67-114v-1s68 65 68 115z"
          />
          <path
            fill={theme`colors.gray.700`}
            d="M502 661l25-35-25 38v4h-5l2-50v-1l1-5-25-38 25 35v1l2-38-21-40 21 33 2-79v-1 63l21-25-21 31-1 34 20-33-20 38v19l28-46-28 52z"
          />
          <path
            fill={theme`colors.indigo.500`}
            d="M836 621c0 55-33 75-74 75h-2l-6-1c-36-2-65-22-65-74 0-53 68-120 73-125s74 70 74 125z"
          />
          <path
            fill={theme`colors.gray.700`}
            d="M760 687l27-37-27 41v5l-6-1 3-55v-5l-27-42 27 38v1l3-42-23-43 23 36 2-87v69l23-27-23 32-1 38 21-36-21 41v21l31-50-31 57z"
          />
          <ellipse
            cx="721.5"
            cy="656.8"
            fill={theme`colors.gray.800`}
            rx="12.4"
            ry="39.5"
            transform="rotate(-65 653 658)"
          />
          <ellipse
            cx="112.5"
            cy="651.8"
            fill={theme`colors.gray.800`}
            rx="12.4"
            ry="39.5"
            transform="rotate(-68 48 651)"
          />
        </svg>

        <h1 tw="text-xl leading-6 font-medium text-gray-900 text-center mt-16">
          {t("NotFound.title")}
        </h1>
        <p tw="max-w-lg text-sm leading-5 text-gray-500 text-center mt-2">{t("NotFound.description")}</p>
        <span tw="inline-flex rounded-md shadow-sm mt-8">
          <Link
            to="/"
            tw="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
          >
            {t("NotFound.goBackToDashboard")}
          </Link>
        </span>
      </main>
    </>
  );
};

export default NotFound;
