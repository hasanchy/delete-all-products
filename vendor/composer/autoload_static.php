<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit6d9bf8c267a2108c3868131fe85b8832
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPCSStandards\\Composer\\Plugin\\Installers\\PHPCodeSniffer\\' => 57,
        ),
        'C' => 
        array (
            'CoenJacobs\\Mozart\\' => 18,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPCSStandards\\Composer\\Plugin\\Installers\\PHPCodeSniffer\\' => 
        array (
            0 => __DIR__ . '/..' . '/dealerdirect/phpcodesniffer-composer-installer/src',
        ),
        'CoenJacobs\\Mozart\\' => 
        array (
            0 => __DIR__ . '/..' . '/coenjacobs/mozart/src',
        ),
    );

    public static $prefixesPsr0 = array (
        'J' => 
        array (
            'JsonMapper' => 
            array (
                0 => __DIR__ . '/..' . '/netresearch/jsonmapper/src',
            ),
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'DAPRODS\\App\\Admin_Pages\\DeleteAllProductsAdmin' => __DIR__ . '/../..' . '/app/admin-pages/class-delete-all-products-admin.php',
        'DAPRODS\\App\\Endpoints\\V1\\ProductsDelete' => __DIR__ . '/../..' . '/app/endpoints/v1/class-products-delete.php',
        'DAPRODS\\App\\Endpoints\\V1\\ProductsRestore' => __DIR__ . '/../..' . '/app/endpoints/v1/class-products-restore.php',
        'DAPRODS\\App\\Endpoints\\V1\\ProductsSearch' => __DIR__ . '/../..' . '/app/endpoints/v1/class-products-search.php',
        'DAPRODS\\App\\Endpoints\\V1\\ProductsStat' => __DIR__ . '/../..' . '/app/endpoints/v1/class-products-stat.php',
        'DAPRODS\\App\\Endpoints\\V1\\ProductsTrash' => __DIR__ . '/../..' . '/app/endpoints/v1/class-products-trash.php',
        'DAPRODS\\App\\Endpoints\\V1\\Settings' => __DIR__ . '/../..' . '/app/endpoints/v1/class-settings.php',
        'DAPRODS\\Core\\Base' => __DIR__ . '/../..' . '/core/class-base.php',
        'DAPRODS\\Core\\Endpoint' => __DIR__ . '/../..' . '/core/class-endpoint.php',
        'DAPRODS\\Core\\Loader' => __DIR__ . '/../..' . '/core/class-loader.php',
        'DAPRODS\\Core\\ProductHelper' => __DIR__ . '/../..' . '/core/class-product-helper.php',
        'DAPRODS\\Core\\Singleton' => __DIR__ . '/../..' . '/core/class-singleton.php',
        'PHPCSUtils\\AbstractSniffs\\AbstractArrayDeclarationSniff' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/AbstractSniffs/AbstractArrayDeclarationSniff.php',
        'PHPCSUtils\\BackCompat\\BCFile' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/BackCompat/BCFile.php',
        'PHPCSUtils\\BackCompat\\BCTokens' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/BackCompat/BCTokens.php',
        'PHPCSUtils\\BackCompat\\Helper' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/BackCompat/Helper.php',
        'PHPCSUtils\\Exceptions\\InvalidTokenArray' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Exceptions/InvalidTokenArray.php',
        'PHPCSUtils\\Exceptions\\LogicException' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Exceptions/LogicException.php',
        'PHPCSUtils\\Exceptions\\MissingArgumentError' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Exceptions/MissingArgumentError.php',
        'PHPCSUtils\\Exceptions\\OutOfBoundsStackPtr' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Exceptions/OutOfBoundsStackPtr.php',
        'PHPCSUtils\\Exceptions\\RuntimeException' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Exceptions/RuntimeException.php',
        'PHPCSUtils\\Exceptions\\TestFileNotFound' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Exceptions/TestFileNotFound.php',
        'PHPCSUtils\\Exceptions\\TestMarkerNotFound' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Exceptions/TestMarkerNotFound.php',
        'PHPCSUtils\\Exceptions\\TestTargetNotFound' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Exceptions/TestTargetNotFound.php',
        'PHPCSUtils\\Exceptions\\TypeError' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Exceptions/TypeError.php',
        'PHPCSUtils\\Exceptions\\UnexpectedTokenType' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Exceptions/UnexpectedTokenType.php',
        'PHPCSUtils\\Exceptions\\ValueError' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Exceptions/ValueError.php',
        'PHPCSUtils\\Fixers\\SpacesFixer' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Fixers/SpacesFixer.php',
        'PHPCSUtils\\Internal\\Cache' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Internal/Cache.php',
        'PHPCSUtils\\Internal\\IsShortArrayOrList' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Internal/IsShortArrayOrList.php',
        'PHPCSUtils\\Internal\\IsShortArrayOrListWithCache' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Internal/IsShortArrayOrListWithCache.php',
        'PHPCSUtils\\Internal\\NoFileCache' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Internal/NoFileCache.php',
        'PHPCSUtils\\Internal\\StableCollections' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Internal/StableCollections.php',
        'PHPCSUtils\\TestUtils\\ConfigDouble' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/TestUtils/ConfigDouble.php',
        'PHPCSUtils\\TestUtils\\UtilityMethodTestCase' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/TestUtils/UtilityMethodTestCase.php',
        'PHPCSUtils\\Tokens\\Collections' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Tokens/Collections.php',
        'PHPCSUtils\\Tokens\\TokenHelper' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Tokens/TokenHelper.php',
        'PHPCSUtils\\Utils\\Arrays' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/Arrays.php',
        'PHPCSUtils\\Utils\\Conditions' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/Conditions.php',
        'PHPCSUtils\\Utils\\Constants' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/Constants.php',
        'PHPCSUtils\\Utils\\Context' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/Context.php',
        'PHPCSUtils\\Utils\\ControlStructures' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/ControlStructures.php',
        'PHPCSUtils\\Utils\\FileInfo' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/FileInfo.php',
        'PHPCSUtils\\Utils\\FilePath' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/FilePath.php',
        'PHPCSUtils\\Utils\\FunctionDeclarations' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/FunctionDeclarations.php',
        'PHPCSUtils\\Utils\\GetTokensAsString' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/GetTokensAsString.php',
        'PHPCSUtils\\Utils\\Lists' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/Lists.php',
        'PHPCSUtils\\Utils\\MessageHelper' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/MessageHelper.php',
        'PHPCSUtils\\Utils\\Namespaces' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/Namespaces.php',
        'PHPCSUtils\\Utils\\NamingConventions' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/NamingConventions.php',
        'PHPCSUtils\\Utils\\Numbers' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/Numbers.php',
        'PHPCSUtils\\Utils\\ObjectDeclarations' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/ObjectDeclarations.php',
        'PHPCSUtils\\Utils\\Operators' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/Operators.php',
        'PHPCSUtils\\Utils\\Orthography' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/Orthography.php',
        'PHPCSUtils\\Utils\\Parentheses' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/Parentheses.php',
        'PHPCSUtils\\Utils\\PassedParameters' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/PassedParameters.php',
        'PHPCSUtils\\Utils\\Scopes' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/Scopes.php',
        'PHPCSUtils\\Utils\\TextStrings' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/TextStrings.php',
        'PHPCSUtils\\Utils\\TypeString' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/TypeString.php',
        'PHPCSUtils\\Utils\\UseStatements' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/UseStatements.php',
        'PHPCSUtils\\Utils\\Variables' => __DIR__ . '/..' . '/phpcsstandards/phpcsutils/PHPCSUtils/Utils/Variables.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit6d9bf8c267a2108c3868131fe85b8832::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit6d9bf8c267a2108c3868131fe85b8832::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit6d9bf8c267a2108c3868131fe85b8832::$prefixesPsr0;
            $loader->classMap = ComposerStaticInit6d9bf8c267a2108c3868131fe85b8832::$classMap;

        }, null, ClassLoader::class);
    }
}
