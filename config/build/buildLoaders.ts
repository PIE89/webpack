import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin"; // формирует отдельный минимизированный css фалй
import { BuildOptions } from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  const cssModuleWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssModuleWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  const babelLoader = buildBabelLoader(options);

  const tsLoader = {
    //ts-loader умеет работать с JSX
    // без TS пришлось бы настраивать babel-loader
    test: /\.tsx?$/,
    loader: "ts-loader",
    options: {
      transpileOnly: true,
      getCustomTransformers: () => ({
        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
      }),
    },
    exclude: /node_modules/,
  };

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const svgLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          native: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  return [svgLoader, assetLoader, scssLoader, babelLoader];
}
