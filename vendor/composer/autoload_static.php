<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitff91c7c733801f90a62b5c0714a24ad4
{
    public static $prefixesPsr0 = array (
        'o' => 
        array (
            'org\\bovigo\\vfs' => 
            array (
                0 => __DIR__ . '/..' . '/mikey179/vfsStream/src/main/php',
            ),
        ),
        'J' => 
        array (
            'JasperPHP' => 
            array (
                0 => __DIR__ . '/..' . '/cossou/jasperphp/src',
            ),
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixesPsr0 = ComposerStaticInitff91c7c733801f90a62b5c0714a24ad4::$prefixesPsr0;

        }, null, ClassLoader::class);
    }
}
